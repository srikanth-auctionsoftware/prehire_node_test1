const Yup = require('yup')

class schemaModule {
    static register() {
        const schema = Yup.object().shape({
            email: Yup.string().email('Invalid email format').required('Required!'),
            confirm_email: Yup.string()
                .email('Invalid email format')
                .oneOf([Yup.ref('email')], "Email's not match")
                .required('Required!'),
            facebook_id: Yup.string(),
            google_id: Yup.string(),
            password: Yup.string().when(['facebook_id', 'google_id'], {
                is: (facebookID, googleID) => !facebookID && !googleID,
                then: Yup.string().min(8, 'Minimum 8 characters').required('Required!'),
            }),
            confirm_password: Yup.string().when(['facebook_id', 'google_id'], {
                is: (facebookID, googleID) => !facebookID && !googleID,
                then: Yup.string()
                    .oneOf([Yup.ref('password')], "Password's not match")
                    .required('Required!'),
            }),
            first_name: Yup.string(),
            last_name: Yup.string(),
            // address1: Yup.string().required('Required!'),
            // phone: Yup.string().required('Required!'),
            // city: Yup.string().required('Required!'),
            // state: Yup.string().required('Required!'),
            // zip: Yup.string().required('Required!'),
        })
        return schema
    }

    static updateProfile() {
        const schema = Yup.object().shape({
            first_name: Yup.string()
                .min(2, 'Mininum 2 characters')
                .max(15, 'Maximum 15 characters')
                .required('Required!'),
            last_name: Yup.string()
                .min(2, 'Mininum 2 characters')
                .max(15, 'Maximum 15 characters')
                .required('Required!'),
            address1: Yup.string().required('Required!'),
            phone: Yup.string().required('Required!'),
            city: Yup.string().required('Required!'),
            state: Yup.string().required('Required!'),
            zip: Yup.string().required('Required!'),
        })
        return schema
    }

    static resetPassword() {
        const schema = Yup.object().shape({
            user_token: Yup.string().required('Required!'),
            password: Yup.string().min(8, 'Minimum 8 characters').required('Required!'),
        })
        return schema
    }

    static login() {
        const schema = Yup.object().shape({
            email: Yup.string().email('Invalid email format').required('Required!'),
            password: Yup.string(),
            google_id: Yup.string(),
            facebook_id: Yup.string(),
        })
        return schema
    }

    static checkValidation() {
        const schema = Yup.object().shape({
            text: Yup.string().required('Required!'),
            type: Yup.string().required('Required!'),
        })
        return schema
    }
}

module.exports.default = schemaModule
