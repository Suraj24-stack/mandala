const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('❌ Validation errors:', errors.array());
        return res.status(400).json({
            success: false,
            message: 'Validation errors',
            errors: errors.array()
        });
    }
    next();
};

const validateRegistration = [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('phone').optional().isMobilePhone(),
    handleValidationErrors
];

const validateLogin = [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    handleValidationErrors
];

// Updated to match your application structure
const validateApplication = [
    // Allow both UUID and numeric IDs for flexibility
    body('courseId').notEmpty().withMessage('Course ID is required'),
    body('universityId').notEmpty().withMessage('University ID is required'),
    body('countryId').notEmpty().withMessage('Country ID is required'),

    // Personal info validation - handle nested object or direct fields
    body('personalInfo.firstName').optional().trim().isLength({ min: 1 }).withMessage('First name is required if provided'),
    body('personalInfo.lastName').optional().trim().isLength({ min: 1 }).withMessage('Last name is required if provided'),
    body('personalInfo.email').optional().isEmail().withMessage('Valid email is required if provided'),
    body('personalInfo.phone').optional().isMobilePhone().withMessage('Valid phone number is required if provided'),

    // Allow flexible structure for compatibility
    body('personalInfo').optional().isObject().withMessage('Personal info must be an object if provided'),
    body('documents').optional().isObject().withMessage('Documents must be an object if provided'),
    body('additionalInfo').optional().isString().withMessage('Additional info must be a string if provided'),

    handleValidationErrors
];

const validateTestimonial = [
    body('name').trim().isLength({ min: 2 }).withMessage('Name is required'),
    body('university').trim().isLength({ min: 2 }).withMessage('University is required'),
    body('course').trim().isLength({ min: 2 }).withMessage('Course is required'),
    body('country').trim().isLength({ min: 2 }).withMessage('Country is required'),
    body('testimonial').trim().isLength({ min: 10 }).withMessage('Testimonial must be at least 10 characters'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    handleValidationErrors
];

// New validation for hero slides
const validateHeroSlide = [
    body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
    body('highlight_text').optional().trim(),
    body('subtitle').optional().trim(),
    body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
    body('country').trim().isLength({ min: 2 }).withMessage('Country is required'),
    body('stats').trim().isLength({ min: 2 }).withMessage('Stats is required'),
    body('is_active').optional().isBoolean().withMessage('is_active must be boolean'),
    body('order_position').optional().isInt({ min: 0 }).withMessage('Order position must be a non-negative integer'),
    handleValidationErrors
];

// Validation for course creation/update
const validateCourse = [
    body('title').trim().isLength({ min: 3 }).withMessage('Course title must be at least 3 characters'),
    body('university').optional().trim().isLength({ min: 2 }).withMessage('University name must be at least 2 characters'),
    body('country_name').optional().trim().isLength({ min: 2 }).withMessage('Country name must be at least 2 characters'),
    body('degree_level').isIn(['bachelor', 'master', 'phd', 'diploma', 'certificate']).withMessage('Invalid degree level'),
    body('duration').trim().isLength({ min: 1 }).withMessage('Duration is required'),
    body('tuition_fee').trim().isLength({ min: 1 }).withMessage('Tuition fee is required'),
    body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
    body('requirements').optional().trim(),
    body('intake_months').optional().trim(),
    body('scholarships_available').optional().isBoolean(),
    body('status').optional().isIn(['active', 'draft', 'archived']).withMessage('Invalid status'),
    body('featured').optional().isBoolean(),
    handleValidationErrors
];

module.exports = {
    validateRegistration,
    validateLogin,
    validateApplication,
    validateTestimonial,
    validateHeroSlide,
    validateCourse,
    handleValidationErrors
};