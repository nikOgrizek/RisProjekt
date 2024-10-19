import React from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import DodajPotovanje from "../Potovanja/DodajPotovanje";
import Potovanja from "../Potovanja/Potovanja";
import PageNotFound from "../PageNotFound/PageNotFound";

export default function Routing(){
    return(
        <Routes>
            <Route path="/" element={<Potovanja />} />
            <Route path="/dodaj-potovanje" component={PotovanjaDodaj} />
          <Route path="/izbrisi-potovanje" component={PotovanjaIzbrisi} />
          <Route path="/posodobi-potovanje" component={PotovanjaPosodobi} />
            <Route path="*" element={<PageNotFound />}/>
        </Routes>
    );
}