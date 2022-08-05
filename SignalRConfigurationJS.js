
const tokenid = "{Token Bearer}"

console.log(tokenid);

const options = {
    accessTokenFactory: () => {
        return tokenid;
    },
    headers: { "Authorization": "Bearer " + tokenid }
};

var parametrosQr = {};

/*  { "OrdenId": 2004974, 
    "Caja": "4",
    "NumeroUnicoSG": "121761",
    "Sello": "VISA_CBS",
    "CodigoVerificacion": "831000",
    "Autorizado": true,
    "Origen": null,
    "EstacionNumero": "105220" } */

const connection = new signalR.HubConnectionBuilder().withUrl("{URL}", options).build();

function onClickButton(e) {
    console.log("test DisconnectStation");

    connection.invoke("{Metodo}", "{Numero}").catch(function (err) {
        return console.error(err.toString());
    });
}

function onClickButtonObtenerDatosCaja(e) {
    const params = {
        OrdenId: 2005022,
        Rut: "216759120012",
        Caja: "6",
        EstacionNumero: "102040",
        FechaHora: "2007-11-03",
        Empresa: "La Empresa S.A"
    }
    connection.invoke("{Metodo}", params).catch(function (err) {
        return console.error(err.toString());
    });
}

function onClickButtonPagoResultDatosPago(e) {
    const params = {
        OrdenId: 2005022,
        Caja: "6",
        NumeroUnicoSG: "121828",
        Sello: "VISA_CBS",
        CodigoVerificacion: "831000",
        Autorizado: true,
        Origen: null,
        EstacionNumero: "102040",
        ...parametrosQr
    }
    connection.invoke("{Metodo}", params).catch(function (err) {
        return console.error(err.toString());
    });
}

connection.on("{Metodo}", function (test) {
    if (test && test.payLoad) {
        parametrosQr.Orden = test.Orden;
        parametrosQr.Numero = test.payLoad.Numero
    }
});

connection.on("RespuestaResultadoPago", function (test) {
    console.log("Respuesta Resultado Pago: ", test);
});

connection.start().then(function () {
    console.clear();
    console.log("conectado al SignalR");
});
