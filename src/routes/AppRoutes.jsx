import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';

//Importacion de paginas
import Home from '../pages/Home';
import NewProducts from '../pages/NewProducts';
import MenCollection from '../pages/MenCollection';
import WomenCollection from '../pages/WomenCollection';

const AppRoutes = () =>{
    return(
        <Routes>
            {/*Layout principal que envuelve el contenido*/}
            <Route path='/' element={<MainLayout/>}>
            {/*Inicias rutas*/}
            <Route index element={<Home/>}/>
            <Route path='/novedades' element={<NewProducts/>}/>
            <Route path='/hombre' element={<MenCollection/>}/>
            <Route path='/mujer' element={<WomenCollection/>}/>

            {/*Ruta: Inicio*/}

            </Route>
            </Routes>
    )
}
    export default AppRoutes;

