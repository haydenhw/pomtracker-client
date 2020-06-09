const isOnboardingActive = false;
export const productionMode = (process.env.NODE_ENV === 'production') || true;
export const modalType = productionMode ? 'WELCOME' : 'ADD_TASKS';
export const renderModal = false;
export const renderFormModal = productionMode ? false : (isOnboardingActive || renderModal);
export const showProgressBar = true || false;
export const isDevOnboardingActive = isOnboardingActive;
