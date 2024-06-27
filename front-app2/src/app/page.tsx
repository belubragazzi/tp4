"use client"
import { useState, useEffect } from "react";
import Login from "../components/Login"; 
import Listado from "../components/Listado";
import {Home} from "./agregar/page";
import { api } from "./utils";
import { Cuenta } from "./Modelo";

//const LISTADO_INICIAL: Cuenta = { ciudades: [] };

export default function Index() {
  const [claveMaestra, setClaveMaestra] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [listado, setListado] = useState<Cuenta[]>([]);


  useEffect(() => {
    // Assuming you have a URL to fetch from
    const fetchData = async () => {
      setLoading(true);
      try {
        // LLAMAN A TRAER LISTADO
        //const data = await response.json();
        //setListado(data);
        
      api<Cuenta[]>('/v1/listado') //que agregamos?
      .then((data: Cuenta[]) => {
        setListado(data);
      })
  
      } catch (error) {
        console.error("Failed to fetch listado:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (claveMaestra !== "") {
      fetchData();
    }
  }, [claveMaestra]); 

    
  return (
    <div className="px-28">
        {claveMaestra ==="" ? (
            <Login setClaveMaestra={setClaveMaestra}></Login>
        ) : loading ? (
          <div>Cargando...</div>

        ) : (
          <div>
            <div>
            <Home></Home>
            </div>

            <div className="grid flex 
            lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 
            gap-8 p-4">
            {listado.map(c =>
              <Listado key={c.contrasenia} listado={c}></Listado>
            )}
          </div>

        </div>

        )
        }
    </div>
  );
}