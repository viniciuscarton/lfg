$(document).ready(function () {
    var campos = $("#campos");
    // var submitCampo = $("submit-campo");
    // var okButton = $("#ok-campo");

    $("#submit-campo").click(function () {
        var novoCampo = $("<div class='campo'>");
        var removerButton = $("<button id='remover-campo'>Remover</button>");
        var nomeCampo = $("<input type='text' placeholder='Campo'>");
        // var tipoCampo = $("<select><option value='texto'>Tipo</option><option value='texto'>Texto</option><option value='numero'>Número</option><option value='data' data-format='dd-mm-yyyy'>Data</option></select>");
        // var obrigatorioDiv = $("<div class='checkbox-label'>");
        // var obrigatorioCampo = $("<input type='checkbox'>");
        // var obrigatorioLabel = $("<label>Obrigatório</label>");
        // obrigatorioDiv.append(obrigatorioCampo, obrigatorioLabel);
        // novoCampo.append(nomeCampo, tipoCampo, obrigatorioDiv, removerButton);
        novoCampo.append(nomeCampo);
        campos.append(novoCampo);
        nomeCampo.focus();
    });

    $("#formulario-d").submit(function (event) {
        event.preventDefault();
        var formData = {};
        $(this).find(".campo").each(function () {
            var nomeCampo = $(this).find("input[type='text']").attr("placeholder");
            var valorCampo = $(this).find("input[type='text']").val();
            formData[nomeCampo] = valorCampo;
        });
        var apiEndpoint = 'http://localhost:3000/api/proxy'; // URL do servidor proxy
        var requestOptions = {
            timeout: 25000,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        };
        console.log(JSON.stringify(formData))
        fetch(apiEndpoint, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.approved === false) {
                    alert('Proposta negada.');
                } else if (data.approved === true) {
                    alert('Proposta enviada para análise.');
                    var formDataForMongo = formData;
                    console.log(formDataForMongo)
                    var mongoApiEndpoint = 'http://localhost:3001/mongo';
                    var mongoRequestOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formDataForMongo),
                    };
                    fetch(mongoApiEndpoint, mongoRequestOptions)
                }
                console.log(data);
                // location.reload();
            })
            .catch(error => {
                console.error('Erro: ', error);
            });
    });

    $("#ok-campo").click(function () {
        $("button#submit-campo, button#ok-campo").hide();
        // campos.find("button#remover-campo, .checkbox-label, select").hide();
        var campoInputs = campos.find("input[type='text']");
        campoInputs.each(function () {
            var nomeCampo = $(this).val();
            $(this).attr("placeholder", nomeCampo);
            $(this).val("");
        });
        // campos.find("input[type='checkbox']:checked").each(function () {
        //     $(this).closest(".campo").append(" *");
        // });
        // campos.find("select option:selected[value='data']").each(function () {
        //     $(this).closest(".campo").append(" (DD/MM/AAAA)");
        // });
    });
    campos.on("click", "#remover-campo", function () {
        $(this).closest(".campo").remove();
        // checkFields();
    });
});