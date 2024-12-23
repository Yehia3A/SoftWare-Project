from flask import Flask, request, jsonify
from pymongo import MongoClient
import numpy as np

app = Flask(__name__)

def recommend(user_data, n_recommendations=5):
    user_id = user_data.get('userId')
    current_courses = user_data.get('courses', [])

    if not user_id:
        return []

    client = MongoClient('mongodb+srv://admin:admin123@cluster0.3ylmz.mongodb.net/')
    db = client['BrainBuddiesDB']
    user_document = db.users.find_one({"_id": user_id})

    if not user_document:
        return []

    learning_preferences = user_document.get('learningPreferences', [])
    subjects_of_interest = user_document.get('subjectsOfInterest', [])

    all_courses = list(db.courses.find({}, {"_id": 1, "category": 1, "subjects": 1}))

    recommended_courses = [
        str(course["_id"])
        for course in all_courses
        if (
            str(course["_id"]) not in current_courses and
            (
                any(pref in course.get("category", []) for pref in learning_preferences) or
                any(subject in course.get("subjects", []) for subject in subjects_of_interest)
            )
        )
    ]

    np.random.shuffle(recommended_courses)
    return recommended_courses[:n_recommendations]

@app.route('/recommend', methods=['POST'])
def get_recommendations():
    try:
        user_data = request.get_json()
        if not user_data or "userId" not in user_data:
            return jsonify({"error": "Invalid input. 'userId' is required."}), 400

        recommendations = recommend(user_data)
        return jsonify({
            "userId": user_data["_id"],
            "recommendedCourses": recommendations
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
