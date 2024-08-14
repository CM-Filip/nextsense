import { AbstractControl } from "@angular/forms";
import { ErrorMessageTemplates, MessageTemplate } from "./errors.interface";

export namespace CustomErrors {
  
  const templates: ErrorMessageTemplates = [
    { key: 'required', message: 'This field is required' },
    { key: 'range', message: 'Enter a number between {min} and {max}' },
    { key: 'lengthRange', message: 'Enter a value between {min} and {max} characters long' },
    { key: 'wordCountRange', message: 'Enter a value between {min} and {max} words' },
    { key: 'email', message: 'Enter a valid email address' },
    { key: 'phone', message: 'Enter a valid phone number' },
  ];

  function parse(error: any, template: MessageTemplate): string {
    if (typeof error != 'object') return template.message;
    let message: string = template.message;
    for (let key in error) {
      message = message.replace(`{${key}}`, error[key]);
    } return message;
  }

  export function first(control: AbstractControl): string | null {
    if (control.pristine) return null;
    const template: MessageTemplate | null = templates.find((template: MessageTemplate) => {
      return control.hasError(template.key);
    }) || null;
    if (template) {
      return parse(control.errors![template.key], template);
    } return null;
  }

  export function all(control: AbstractControl): Array<string> {
    if (control.pristine) return [];
    return templates.filter((template: MessageTemplate) => {
      return control.hasError(template.key);
    }).map((template: MessageTemplate) => parse(control.errors![template.key], template));
  }
}