class Validation {
  valid = false;

  constructor(constraints) {
    this.constraints = constraints;
  }

  //we send in entire target, but destruct it to only name and value
  validate(field) {
    const { name, value } = field;
    const fieldConstraints = this.constraints[name] || null;

    let validationMessage = '';

    if (fieldConstraints) {
      if (fieldConstraints.required) {
        if (value.length === 0) {
          this.valid = false;
          validationMessage = fieldConstraints.required;
        }
      }
      /* Checking length */
      if (fieldConstraints.length) {
        const { valid, message } = this.validateLength(value, fieldConstraints.length);
        if (!valid) validationMessage += `${message} `;

        this.valid = valid;
      }
      /* POC: Checking number */
      if (fieldConstraints.number) {
        const { valid, message } = this.validateNumber(value, fieldConstraints.number);
        if (!valid) validationMessage += `${message} `;
        this.valid = valid;
      }
      /* other constraint-checks goes here */
    }

    return validationMessage;
  }

  validateLength({ length }, { min, max, message }) {
    //Om min finns, kolla värde, annars är valid true kolla sedan om max finns och gör jämförelsen om parametern finns, annars true.
    const valid = (min ? length >= min : true) && (max ? length < max : true);

    if (!valid) {
      message = message.replace('%min', min);
      message = message.replace('%max', max);
    } else {
      message = '';
    }

    return { valid, message };
  }

  /* POC */
  validateNumber(value, { min, max, message }) {
    //Om min finns, kolla värde, annars är valid true kolla sedan om max finns och gör jämförelsen om parametern finns, annars true.
    const valid = (min ? value >= min : true) && (max ? value <= max : true);

    if (!valid) {
      message = message.replace('%min', min);
      message = message.replace('%max', max);
    } else {
      message = '';
    }
    return { valid, message };
  }

  isValid() {
    return this.valid;
  }
}
