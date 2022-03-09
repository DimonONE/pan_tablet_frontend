export enum commentsActionsType {
  COMMENTS_LOADED = "COMMENTS_LOADED",
  COMMENTS_LOADING = "COMMENTS_LOADING",
  COMMENTS_LOADING_FAILED = "COMMENTS_LOADING_FAILED",
  WORK_COMMENTS = "WORK_COMMENTS",
}

export interface ICommentData {
  comment: string;
  anonAuthor: string;
}
