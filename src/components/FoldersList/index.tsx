import "./FoldersList.scss";
import { FC } from "react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootReducer } from "../../store/reducers";
import { Folder } from "../Folder";
import { getAllFolders } from "../../store/actions/folders";
import { If } from "../If";

interface IFoldersList {
  ButtonAction: (id: number) => void;
}

export const FoldersList: FC<IFoldersList> = ({ ButtonAction }) => {
  const dispatch = useDispatch();
  const foldersRef = useRef<HTMLDivElement>(null);
  const { folders } = useSelector((state: IRootReducer) => state.folders);

  useEffect(() => {
    dispatch(getAllFolders());
    foldersRef?.current?.scrollTo({ top: 0 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="folders" ref={foldersRef}>
      <If
        condition={!!folders.length}
        anotherChildren={<div className="header">Nowa teczka</div>}
      >
        {folders?.map((folder) => (
          <Folder
            folder={folder}
            action={ButtonAction}
            key={folder.id.toString()}
          />
        ))}
      </If>
    </div>
  );
};
