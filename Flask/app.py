from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)

def recommend(user_data, n_recommendations=5):
    try:
        user_id = user_data.get('userId')
        current_courses = user_data.get('courses', [])

        app.logger.info(f"Current courses: {current_courses}")

        if not user_id:
            return []
        
        client = MongoClient('mongodb+srv://elearning:elearning123@cluster0.3ylmz.mongodb.net/')
        db = client['E-learning']
        user_document = db.users.find_one({"_id": ObjectId(user_id)})

        if not user_document:
            return []

        learning_preferences = user_document.get('learningPreferences', [])
        subjects_of_interest = user_document.get('subjectsOfInterest', [])

        app.logger.info(f"User learning preferences: {learning_preferences}")
        app.logger.info(f"User subjects of interest: {subjects_of_interest}")

        all_courses = list(db.courses.find({}, {"_id": 1, "category": 1, "title": 1}))

        app.logger.info(f"Total courses fetched: {len(all_courses)}")

        recommended_courses = []
        for course in all_courses:
            course_id = str(course["_id"])
            course_categories = course.get("category", [])
            app.logger.info(f"Checking course {course_id} with categories {course_categories}")

            if (
                course_id not in current_courses and
                any(subject in course_categories for subject in subjects_of_interest)
            ):
                recommended_courses.append({
                    'id': course_id,
                    'title': course['title']
                })

        app.logger.info(f"Recommended courses: {recommended_courses}")

        return {
            "userId": user_id,
            "recommendedCourses": [course['title'] for course in recommended_courses[:n_recommendations]]
        }
    except Exception as e:
        app.logger.error(f"Error in recommend function: {e}")
        return []

@app.route('/recommend', methods=['POST'])
def get_recommendations():
    try:
        user_data = request.get_json()
        if not user_data or "userId" not in user_data:
            return jsonify({"error": "Invalid input. 'userId' is required."}), 400

        app.logger.info(f"Received data: {user_data}")

        recommendations = recommend(user_data)
        return jsonify(recommendations)
    except Exception as e:
        app.logger.error(f"Error in get_recommendations endpoint: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
