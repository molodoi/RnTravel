export type AuthData = {
    token: string;
    email: string;
    name?: string;
    password?: string;
};

const login = async (email: string, _password: string): Promise<AuthData> => {
    // Mock un appel API, dans la vraie application, il faudra se connecter avec une vraie API, envoyer un e-mail et un mot de passe, et si les informations d'identification sont correctes, l'API résoudra et renverra un jeton et d'autres données en payload comme ci-dessous
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
            token: JWTTokenMock,
            email: email,
            name: 'Matt Matt',
            });
        }, 1000);
    });
};

const register = (name: string, email: string, _password: string): Promise<AuthData> => {
    // Mock un appel API, dans la vraie application, il faudra se connecter avec une vraie API, envoyer un name, e-mail et un mot de passe, et si les informations sont correctes, l'API résoudra et renverra un jeton et d'autres données en payload comme ci-dessous
    return new Promise(resolve => {
        setTimeout(() => {
        resolve({
            token: JWTTokenMock,
            email: email,
            name: 'Matt Matt',
            password: _password,
        });
        }, 1000);
    });
};


export const authService = {
    login,
    register,
};

const JWTTokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikx1Y2FzIEdhcmNleiIsImlhdCI6MTUxNjIzOTAyMn0.oK5FZPULfF-nfZmiumDGiufxf10Fe2KiGe9G5Njoa64';
