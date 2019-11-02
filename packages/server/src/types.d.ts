declare namespace Definitions {
    export interface User {
        id: number;
        firstName: string;
        lastName: string;
        contactInfo?: {
            [name: string]: any;
        };
        userName: string;
    }
}
declare namespace Paths {
    namespace GetUsers {
        namespace Responses {
            export type $200 = Definitions.User[];
        }
    }
}
