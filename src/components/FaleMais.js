import React, { useState, useEffect } from 'react';
import FaleMaisDataService from "../services/FaleMaisService";

function FaleMais() {

    const [result, setResult] = useState(null);
    const [ddds, setDDDs] = useState([]);
    const [plans, setPlans] = useState([]);
    const [faleMais, setFaleMais] = useState({
        dddSource: 0,
        dddTarget: 0,
        time: '',
        plan: 0
    });

    useEffect(() => {
        FaleMaisDataService.getDDDs()
            .then(response => {
                setDDDs(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

        FaleMaisDataService.getPlans()
            .then(response => {
                setPlans(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFaleMais({ ...faleMais, [name]: value });
    };

    const handleFormSubmit = event => {console.log(faleMais)
        FaleMaisDataService.getTariff(faleMais)
        .then(response => {
            console.log(response.data);

            if (!response.data.erro) {
                setResult(response.data);
            } else {
                setResult(null);
            }
        })
        .catch(e => {
            console.log(e);
        });
    };

    return (
        <div>
            <fieldset>
                <legend>
                    <h2>Simule o plano desejado</h2>
                </legend>

                <div>
                    <select name="dddSource" id="dddSource" required onChange={handleInputChange} >
                        <option value="0">DDD Origem</option>
                        {ddds.map(ddd => (<option key={ddd.id} value={ddd.id}>{ddd.value}</option>))}
                    </select>

                    <select name="dddTarget" id="dddTarget" required onChange={handleInputChange} >
                        <option value="0">DDD Destino</option>
                        {ddds.map(ddd => (<option key={ddd.id} value={ddd.id}>{ddd.value}</option>))}
                    </select>

                    <input type="text" name="time" id="time" placeholder="Minutos" required onChange={handleInputChange} />

                    <select name="plan" id="plan" required onChange={handleInputChange} >
                        <option value="0">Plano Fale Mais</option>
                        {plans.map(plan => (<option key={plan.id} value={plan.id}>{plan.value}</option>))}
                    </select>

                    <button onClick={handleFormSubmit}>Simular</button>
                </div>
            </fieldset>
            {result ? (
                <div>
                    <div>
                        <label><strong>Com FaleMais: {result.valorFaleMais}</strong></label>
                    </div>
                    <div>
                        <label><strong>Sem FaleMais: {result.valorNormal}</strong></label>
                    </div>
                </div>
            ) : (
                <div>
                
                </div>
            )}
        </div>
    )
}

export default FaleMais;