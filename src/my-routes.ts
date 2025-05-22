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
        absolute: '/main/core',
        operator: {
            base: 'operator',
            absolute: '/main/core/operator',
            dashboard: {
                base: 'dashboard',
                absolute: '/main/core/operator/dashboard'
            },
            project: {
                base: 'projects',
                absolute: '/main/core/operator/projects',
                list: {
                    base: 'projects/list',
                    absolute: '/main/core/operator/projects/list'
                },
                form: {
                    base: 'projects/form',
                    absolute: '/main/core/operator/projects/form'
                },
                document: {
                    base: 'projects/document',
                    absolute: '/main/core/operator/projects/document'
                }
            },
            program: {
                base: 'programs',
                absolute: '/main/core/operator/programs',
                list: {
                    base: 'programs/list',
                    absolute: '/main/core/operator/programs/list'
                },
                form: {
                    base: 'programs/form',
                    absolute: '/main/core/operator/programs/form'
                },
                document: {
                    base: 'programs/document',
                    absolute: '/main/core/operator/programs/document'
                }
            },
            strategicPlan: {
                base: 'strategic-plans',
                absolute: '/main/core/operator/strategic-plans',
                list: {
                    base: 'strategic-plans/list',
                    absolute: '/main/core/operator/strategic-plans/list'
                },
                form: {
                    base: 'strategic-plans/form',
                    absolute: '/main/core/operator/strategic-plans/form'
                },
                document: {
                    base: 'strategic-plans/document',
                    absolute: '/main/core/operator/strategic-plans/document'
                }
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
    signIn: '/auth/sign-in',
    dashboards: {
        base: 'dashboards',
        absolute: '/main/dashboards'
    }
};
