import { useEffect } from "react";
import { Football } from "./Football";
import { useDispatch } from "react-redux";
import { getUserInfoByID } from "./features/user/userThunk";
import { getUserToken } from "./utils/global";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    let token = getUserToken();
    if (token != null) {
      dispatch(getUserInfoByID());
    }
  }, [dispatch]);
  return (
    <div className="App">
      <Football />
    </div>
  );
}

export default App;
