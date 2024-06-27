import { Request, Response } from "express";
import db from "../config/database.ts";
import { QueryError, QueryResult } from "mysql2";

interface siswa {
  id_student: number;
  name_student: string;
  age_student: number;
  grade: number;
  exam_Score: string;
  enrollment_date: Date;
}

export const getStudentAge = (req: Request, res: Response) => {
  const { age_student } = req.params;
  const sqlQuery = "SELECT * FROM student WHERE age_student = ?";
  const params = [age_student];

  db.query(sqlQuery, params, (err: QueryError | null, result: QueryResult) => {
    const student = result as siswa[];
    if (err) {
      return res.status(500).send(err);
    }
    if (student.length > 0) {
      return res.status(200).send(student);
    } else {
      return res.status(404).send("student age not found");
    }
  });
};

export const getStudentScoreByGrade = (req: Request, res: Response) => {
  const { grade } = req.params;
  const sqlQuery =
    "SELECT name_student,exam_score FROM student WHERE grade = ?";
  const params = [grade];

  db.query(sqlQuery, params, (err: QueryError | null, result: QueryResult) => {
    const student = result as siswa[];
    if (err) {
      return res.status(500).send(err);
    }
    if (student.length > 0) {
      return res.status(200).send(student);
    } else {
      return res.status(404).send("grade not found");
    }
  });
};

export const gradeRankings = (req: Request, res: Response) => {
  const sqlQuery = "SELECT * FROM student ORDER BY exam_score DESC";
  db.query(sqlQuery, (err: QueryError | null, result: QueryResult) => {
    const student = result as siswa[];
    if (err) {
      return res.status(500).send(err);
    }
    if (student.length > 0) {
      return res.status(200).send(student);
    } else {
      return res.status(404).send("grades not found");
    }
  });
};

export const getStudentCountByclass = (req: Request, res: Response) => {
  const sqlQuery = "SELECT grade,COUNT(grade) FROM student GROUP BY grade ";
  db.query(sqlQuery, (err: QueryError | null, result: QueryResult) => {
    const student = result as siswa[];
    if (err) {
      return res.status(500).send(err);
    }
    if (student.length > 0) {
      return res.status(200).send(student);
    } else {
      return res.status(404).send("class not found");
    }
  });
};

export const avgPerClass = (req: Request, res: Response) => {
  const sqlQuery =
    "SELECT grade,AVG(exam_score) FROM student GROUP BY grade HAVING COUNT(*)>2";
  db.query(sqlQuery, (err: QueryError | null, result: QueryResult) => {
    const student = result as siswa[];
    if (err) {
      return res.status(500).send(err);
    }
    if (student.length > 0) {
      return res.status(200).send(student);
    } else {
      return res.status(404).send("grades not found");
    }
  });
};

export const uniqueClass = (req: Request, res: Response) => {
  const sqlQuery = "SELECT grade FROM student GROUP BY grade HAVING COUNT(*)=1";
  db.query(sqlQuery, (err: QueryError | null, result: QueryResult) => {
    const student = result as siswa[];
    if (err) {
      return res.status(500).send(err);
    }
    if (student.length > 0) {
      return res.status(200).send(student);
    } else {
      return res.status(404).send("grades not found");
    }
  });
};

export const firstFive = (req: Request, res: Response) => {
  const sqlQuery =
    "SELECT * FROM student ORDER BY enrollment_date DESC LIMIT 5";
  db.query(sqlQuery, (err: QueryError | null, result: QueryResult) => {
    const student = result as siswa[];
    if (err) {
      return res.status(500).send(err);
    }
    if (student.length > 0) {
      return res.status(200).send(student);
    } else {
      return res.status(404).send("grades not found");
    }
  });
};

export const getScoreByScoreAndAge = (req: Request, res: Response) => {
  const sqlQuery =
    "SELECT name_student,exam_score FROM student WHERE exam_score > ? AND age_student > ?";
    const { exam_score, age_student } = req.query;
    const query = [exam_score, age_student];
    const examScoreNumber = parseFloat(exam_score as string);
    const ageStudentNumber = parseInt(age_student as string, 10);
  
  if (!exam_score || !age_student) {
    return res.status(400).send('Both exam_score and age_student are required');
  }

  if (isNaN(examScoreNumber) || isNaN(ageStudentNumber)) {
    return res.status(400).send('Invalid exam_score or age_student');
  }
 


  db.query(sqlQuery, query, (err: QueryError | null, result: QueryResult) => {
    const student = result as siswa[];
    if (err) {
      return res.status(500).send(err);
    }
    if (student.length > 0) {
      return res.status(200).send(student);
    } else {
      return res.status(404).send("grade not found");
    }
  });
};

export const getAvgByAge = (req: Request, res: Response) => {
  const { age_student } = req.params;
  const sqlQuery = "SELECT AVG(exam_score) FROM student WHERE age_student = ?";
  const params = [age_student];

  db.query(sqlQuery, params, (err: QueryError | null, result: QueryResult) => {
    const student = result as siswa[];
    if (err) {
      return res.status(500).send(err);
    }
    if (student.length > 0) {
      return res.status(200).send(student);
    } else {
      return res.status(404).send("grade not found");
    }
  });
};

export const getMaxScoreByClass = (req: Request, res: Response) => {
  const { grade } = req.params;
  const sqlQuery = "SELECT MAX(exam_score) FROM student WHERE grade = ?";
  const params = [grade];

  db.query(sqlQuery, params, (err: QueryError | null, result: QueryResult) => {
    const student = result as siswa[];
    if (err) {
      return res.status(500).send(err);
    }
    if (student.length > 0) {
      return res.status(200).send(student);
    } else {
      return res.status(404).send("grade not found");
    }
  });
};
