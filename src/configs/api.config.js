const apiConfig = {
    dev: "http://localhost:3001/",
    prod: "https://personal-desicion-api.herokuapp.com/",
    // SO: current env
    whichEnv: "dev",
    // whichEnv: "prod",
}

const apiConfigSwitcher = () => {
    return apiConfig.whichEnv === 'dev' ? apiConfig.dev : apiConfig.prod;
}

const ApiRoutes = {
    getAllWorkers: `${apiConfigSwitcher()}workers/getAllWorkers`,
}

export default ApiRoutes;