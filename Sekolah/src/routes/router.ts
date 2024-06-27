import express from "express";
import { avgPerClass, firstFive, getAvgByAge, getMaxScoreByClass, getScoreByScoreAndAge, getStudentAge,getStudentCountByclass,getStudentScoreByGrade, gradeRankings, uniqueClass } from "../controller/controlSekolah.ts"; 

const router = express.Router();


router.get("/student/age/:age_student", getStudentAge);
router.get("/student/grade/:grade", getStudentScoreByGrade);
router.get("/student/graderanks", gradeRankings);
router.get("/student/class/count", getStudentCountByclass);
router.get("/class/average",avgPerClass);
router.get("/class/unique", uniqueClass);
router.get("/student/enroll/first", firstFive);
router.get("/score/filter", getScoreByScoreAndAge);
router.get("/score/average/:age_student", getAvgByAge);
router.get("/score/highest/:grade", getMaxScoreByClass);
  export {router as sekolahRouter}