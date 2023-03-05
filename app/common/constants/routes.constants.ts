export enum MainRoutes {
  Static = "/static",
  Theory = "/theory",
  Practice = "/practice",
  User = "/user",
  Root = "",
  Login = "/login",
  SignUp = "/sign-up",
}

export enum SubRoutes {
  Root = "",
  UpdateRole = "update-role",
}

export enum QueryParams {
  Discipline = "discipline",
  TheoryId = "theory_id",
  PracticeId = "practice_id",
}

export enum SchemaNames {
  Theory = "Theory",
  Practice = "Practice",
  Content = "Content",
  Image = "Image",
  User = "User",
  Role = "Role",
  Discipline = "Discipline",
  Quiz = "Quiz",
}
