export const addValidation = (pattern, message) => {
    return Object.assign({}, {
        validator: value => pattern.test(value),
        message: props => `${props.value} ${message}`
    })
};

export const timestamps = { timestamps: {createdAt: 'createdAt'} };