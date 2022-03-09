export interface ICommentsInitialState {
    loading: boolean,
    loaded: boolean,
    bookComments: IComment[],
    errorStatus: boolean,
    errorMessage: string
};

export interface IComment {
    creationDate: number,
    id: number
    author: IAuthor,
    comment: string,
};

interface IAuthor {
    accountName: string,
};