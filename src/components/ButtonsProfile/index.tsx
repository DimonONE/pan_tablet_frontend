import { FC } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { removeUser } from "../../store/actions/registration";

export const ButtonsProfile: FC<{ userId: number | undefined }> = ({
  userId,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <>
      <button
        type="submit"
        className="delete_account"
        onClick={() => dispatch(removeUser(history))}
      >
        USUŃ KONTO
      </button>

      <button type="submit" className="save_data">
        ZAPISZ DANE
      </button>
    </>
  );
};
