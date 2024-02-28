const userEmailValidateRegexp = /^[\w_.]+@([\w-]+\.)+[\w-]{2,4}$/;
const userPasswordMinLength = 6;

const errorTip =
  "Please provide params for user: -p for password, -n for name and -m for email";
const noParamsError = "No params received.";
const notEnoughParamsError = "Some of params is not provided.";
const notCorrectPassword = "Password is incorrect. Min length is 6";
const notCorrectEmail = "Incorrect email. Please provide correct email";
const inputParams = process.argv.slice(2);

const paramsMap = {
  "-p": "password",
  "-n": "name",
  "-m": "email",
};

const validateParamsInput = (paramsArr) => {
  if (!paramsArr || !paramsArr.length) {
    console.error(noParamsError + errorTip);
    return null;
  }

  if (paramsArr.length !== Object.keys(paramsMap).length * 2) {
    console.error(notEnoughParamsError + errorTip);
    return null;
  }
};

const generateParamsObject = (paramsArr) => {
  return paramsArr.reduce((acc, el, index, array) => {
    if (!(index % 2)) {
      acc[paramsMap[el]] = array[+index + 1];
    }
    return acc;
  }, {});
};

const validateParams = (paramsObject) => {
  const { password, email } = paramsObject;
  if (password.length < userPasswordMinLength) {
    console.error(notCorrectPassword);
    return null;
  }

  if (!userEmailValidateRegexp.test(email)) {
    console.error(notCorrectEmail);
    return null;
  }
};

validateParamsInput(inputParams);
const params = generateParamsObject(inputParams);
validateParams(params);
