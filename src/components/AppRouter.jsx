import React, {useContext} from "react";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {Routes, Route, Navigate} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../routes";
import { LOGIN_ROUTE } from "../utils/consts";
import { CHAT_ROUTE } from "../utils/consts";

const AppRouter =() => {
  const {auth} = useContext(Context);
  const [user] = useAuthState(auth);


  return user ? 
    (
      <Routes>
        {privateRoutes.map(({path, element}) => (
				  <Route key={path} path={path} element={element} />
        ))}
        <Route path="*" element={<Navigate to={CHAT_ROUTE} replace />} />
      </Routes>
    )
    :
    (
      <Routes>
        {publicRoutes.map(({path, element}) => (
				  <Route key={path} path={path} element={element } />
        ))}
        <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
      </Routes>
    )
}

export default AppRouter;