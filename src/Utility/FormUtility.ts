import { ContactForm } from "../models/ContactForm";

interface Dictionary<T> {
    [Key: string]: T;
}

const patterns: Dictionary<RegExp | number> = {};
patterns["name"] = 2;
patterns["email"] = /.{1,}@.*\..{1,}/;
patterns["comments"] = 5;

type SetForm = (form: ContactForm) => void; 
type SetBool = (value: boolean) => void; 

export const validateAll = (form: ContactForm, errors: ContactForm, setErrors?: SetForm, setCanSubmit?: SetBool) => {

    Object.keys(form).forEach(key => validate(form, errors, key));

    if (setErrors !== undefined)
        setErrors(errors);

    var canSubmit = Object.values(errors).every(i => i === "");
    if (setCanSubmit !== undefined)
        setCanSubmit(canSubmit);

    return canSubmit;

}

export const validate = (form: ContactForm, errors: ContactForm, name: string, setErrors?: SetForm, setCanSubmit?: SetBool) =>
    _validate(form, errors, name, setErrors, setCanSubmit);

function _validate(form: ContactForm, errors: ContactForm, name: string, setErrors?: SetForm, setCanSubmit?: SetBool) {

    const pattern = patterns[name];
    
    errors[name] = "";
    if (!form[name]) errors[name] = "Please enter a value";
    if (pattern instanceof RegExp && !pattern.test(form[name] ?? "")) errors[name] = "Please enter a valid e-mail address"; 
    else if (!isNaN(pattern as number) && (form[name]?.trim()?.length ?? 0) < pattern) errors[name] = "Please use at least " + pattern + " characters";
    
    if (setErrors !== undefined)
        setErrors(errors);

    var canSubmit = Object.values(errors).every(i => i === ""); 
    if (setCanSubmit !== undefined)
        setCanSubmit(canSubmit);
        console.log(errors);
    return canSubmit;

};

export const submit = (url: string, method: string, json: string, setResult: (_: Response) => void, contentType = "application/json") => {
    fetch(url, {
        method: method,
        headers: { "Content-Type": contentType },
        body: json
    }).then(setResult);
};
