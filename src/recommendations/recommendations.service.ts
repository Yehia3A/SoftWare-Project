import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Recommendation } from './recommendations.schema';
import { User } from '../users/user.schema';
import { Course } from '../courses/courses.schema';
import { Module } from '../modules/modules.schema';


@Injectable()
export class RecommendationsService {}
