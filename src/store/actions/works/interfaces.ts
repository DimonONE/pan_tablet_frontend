export enum worksActionsType {
  WORKS_LOADING = "WORKS_LOADING",
  WORKS_LOADED = "WORKS_LOADED",
  WORKS_LOADING_FAILED = "WORKS_LOADING_FAILED",
  RESET_WORKS = "RESET_WORKS",
}

export interface IWorkCommentData {
  comment: string;
  anonAuthor: string;
}
