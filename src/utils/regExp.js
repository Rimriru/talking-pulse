const NAME_REG_EXP = /[A-Za-z]/;
const PASSWORD_REG_EXP =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!:;}{"=+%^*~><#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export { NAME_REG_EXP, PASSWORD_REG_EXP };
