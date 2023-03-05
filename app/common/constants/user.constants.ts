export const userNameMinLength = 5;

export const userNameMaxLength = 100;

export const userEmailValidateRegexp = /^[\w_.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const userEmailMessage =
  "Incorrect email. Valid email may has letters, digits and chars '_', '.'";

export const userPasswordMinLength = 6;

export const userCreatedMessage = ({
  user_name,
  user_email,
}: {
  user_name: string;
  user_email: string;
}) =>
  `User with name ${user_name} and email ${user_email} was successfully created`;
