export const MY_ROUTES = {
    home: '',
    layout: {
        base: 'layout'
    },
    errorPages: {
        base: 'errors',
        unauthorized: {
            absolute: '/errors/401',
            base: '401'
        },
        forbidden: {
            absolute: '/errors/403',
            base: '403'
        },
        notFound: {
            absolute: '/errors/404',
            base: '404'
        },
        unavailable: {
            absolute: '/errors/503',
            base: '503'
        }
    },
    corePages: {
        base: 'core',
        absolute: '/pages/core',
        dacTechnician: {
            base: 'dac-technician',
            absolute: '/pages/core/dac-technician',
            dashboard: {
                base: 'dashboard',
                absolute: '/pages/core/dac-technician/dashboard'
            }
        },
        external: {
            base: 'external-technician',
            absolute: '/pages/core/external-technician',
            dashboard: {
                base: 'dashboard',
                absolute: '/pages/core/external-technician/dashboard'
            }
        },
        gadTechnician: {
            base: 'dac-technician',
            absolute: '/pages/core/gad-technician',
            dashboard: {
                base: 'dashboard',
                absolute: '/pages/core/gad-technician/dashboard'
            }
        },
        specialistTechnician: {
            base: 'specialist-technician',
            absolute: '/pages/core/specialist-technician',
            dashboard: {
                base: 'dashboard',
                absolute: '/pages/core/specialist-technician/dashboard'
            }
        },
        zonalTechnician: {
            base: 'zonal-technician',
            absolute: '/pages/core/zonal-technician',
            dashboard: {
                base: 'dashboard',
                absolute: 'pages/core/zonal-technician/dashboard'
            }
        }
    },
    authPages: {
        base: 'auth',
        signIn: {
            base: 'sign-in',
            absolute: '/auth/sign-in'
        },
        signUp: {
            base: 'sign-up',
            absolute: '/auth/sign-up'
        },
        passwordReset: {
            base: 'password-reset',
            absolute: '/auth/password-reset'
        }
    },
    login: 'auth/sign-in',
    dashboard: '/dashboard',
};
