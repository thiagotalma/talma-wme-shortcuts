var talmaLog = function (str) {
        if (typeof console.log == "function") {
            console.log("[talmaAcertarNomeRua] " + str);
        }
    },

    talmaWaitCount = 0,

    talmaWait = function ($el, status, callback) {
        if (talmaWaitCount++ <= 30 && !$el.is(status)) {
            talmaLog("{talmaWait}" + $el + status + callback);
            setTimeout(function () {
                talmaWait($el, status, callback);
            }, 100);

            return false;
        }
        return true;
    },

    talmaAcertarNomeRuaAbreviacoes = [
        ['Dr', 'Dr.'],
        ['Prof', 'Prof.'],
        ['E', 'e'],
        ['Tv', 'Tv.'],
        ['Ve', 'Ve.'],
        ['Acesso', 'Ac.'],
        ['Alameda', 'Al.'],
        ['Avenida', 'Av.'],
        ['Beco', 'B.'],
        ['Bloco', 'Bl.'],
        ['Cal(ç|c)ada', 'Calç.'],
        ['Caminho', 'Cam.'],
        ['Ch(á|a)cara', 'Ch.'],
        ['Condom(í|i)nio', 'Cond.'],
        ['Conjunto', 'Cj.'],
        ['Edif(í|i)cio', 'Ed.'],
        ['Estrada', 'Est.'],
        ['Fazenda', 'Faz.'],
        ['Galeria', 'Gal.'],
        ['Granja', 'Gja.'],
        ['Jardim', 'Jd.'],
        ['Largo', 'Lg.'],
        ['Loteamento', 'Lot.'],
        ['Marginal', 'Marg.'],
        ['Parque', 'Prq.'],
        ['Pra(ç|c)a', 'Pç.'],
        ['Praia', 'Pr'],
        ['Quadra', 'Q.'],
        ['Rodovia', 'Rod.'],
        ['Rua', 'R.'],
        ['Servid(ã|a)o', 'Serv.'],
        ['Setor', 'St.'],
        ['Travessa', 'Tv.'],
        ['Via', 'V.'],
        ['Viaduto', 'Vd.'],
        ['Viela', 'Ve.'],
        ['Vila', 'Vl.'],
        ['Agr(í|i)cola', 'Agr.'],
        ['Almirante', 'Alm.'],
        ['Brigadeiro', 'Brig.'],
        ['Capit(ã|a)o', 'Cap.'],
        ['C(ô|o)nego', 'Con.'],
        ['Coronel', 'Cel.'],
        ['Deputado', 'Dep.'],
        ['Desembargador', 'Des.'],
        ['Dom', 'D.'],
        ['Dona', 'Da.'],
        ['Doutor', 'Dr.'],
        ['Doutora', 'Dra.'],
        ['Enfermeiro', 'Enf.'],
        ['Enfermeira', 'Enfa.'],
        ['Engenheiro', 'Eng.'],
        ['General', 'Gen.'],
        ['Governador', 'Gov.'],
        ['J(ú|u)nior', 'Jr.'],
        ['Major', 'Maj.'],
        ['Marechal', 'Mal.'],
        ['Monsenhor', 'Mons.'],
        ['Nossa Senhora', 'N.Sra.'],
        ['Nosso Senhor', 'N.Sr.'],
        ['Nosso', 'N.'],
        ['Nossa', 'Na.'],
        ['Padre', 'Pe.'],
        ['Pass', 'Passagem'],
        ['Prefeito', 'Pref.'],
        ['Presidente', 'Pres.'],
        ['Professor', 'Prof.'],
        ['Professora', 'Profa.'],
        ['Promotor', 'Prom.'],
        ['Senador', 'Sen.'],
        ['Senhor', 'Sr.'],
        ['Senhora', 'Sra.'],
        ['Tenente', 'Ten.'],
        ['Vereador', 'Ver.'],
        ['Sao', 'São'],
        ['Joao', 'João'],
        ['Antonio', 'Antônio'],
        ['Sebastiao', 'Sebastião'],
        ['Salomao', 'Salomão'],
        ['Magalhaes', 'Magalhães'],
        ['Jose', 'José']
    ],

    talmaAcertarNomeRuaAbreviacoesRegex = [
        [' D(o|a|e)(s?) ', ' d$1$2 ']
    ],

    talmaAcertarNomeRuaReplace = function (str) {
        talmaLog('Replace - Inicio');
        var final = str, i, abrevia, re;

        for (i = 0; i < talmaAcertarNomeRuaAbreviacoesRegex.length; i++) {
            abrevia = talmaAcertarNomeRuaAbreviacoesRegex[i];
            talmaLog("regex:" + abrevia[0] + " - " + abrevia[1]);
            re = new RegExp(abrevia[0], 'g');
            final = final.replace(re, abrevia[1]);
        }

        for (i = 0; i < talmaAcertarNomeRuaAbreviacoes.length; i++) {
            abrevia = talmaAcertarNomeRuaAbreviacoes[i];
            talmaLog(abrevia[0] + " - " + abrevia[1]);
            re = new RegExp('([\\s]|^)(' + abrevia[0] + ')([\\s]|$)', 'g');
            final = final.replace(re, '$1' + abrevia[1] + '$3');
        }

        talmaLog('Replace - Fim');

        return final;
    },

    talmaAcertarNomeRuaPreparar = function () {
        talmaLog('Preparar - Inicio');
        //console.log('[ACERTAR] Inicio');
        if (!$(".address-edit-btn").is(':visible')) {
            talmaLog('Botão editar não encontrado');
            return false;
        }
        $('.select-entire-street').click();
        $(".address-edit-btn").click();
        talmaLog('Preparar - Fim');
        return true;
    },

    talmaAcertarNomeRuaLimpaAlternativo = function () {
        talmaLog('LimpaAlternativo - Inicio');

        if (!talmaAcertarNomeRuaPreparar()) {
            talmaLog('LimpaAlternativo - Falhou!');
            return false;
        }

        function clicar() {
            $('.alt-street-delete i:visible').click();
            if ($('.alt-street-delete i:visible').length > 0) {
                talmaLog('Clicar limpar - Aguardando...');
                setTimeout(clicar, 500);
            }
        }

        clicar();

        $(".address-form-actions button").eq(1).click();
        talmaLog('LimpaAlternativo - Fim');
    },

    talmaAcertarNomeRuaExec = function () {
        talmaLog('Exec - Inicio');
        if (!talmaAcertarNomeRuaPreparar()) {
            talmaLog('Exec - Falhou!');
            return false;
        }
        var $campoRua = $("input.streetName");
        var nome = $campoRua.val();
        var ajustado = talmaAcertarNomeRuaReplace(nome);
        $campoRua.val(ajustado);
        $(".address-form-actions button").eq(1).click();
        talmaLog('Fim');
    },

    talmaAcertarNomeRuaKeydown = function (e) {
        if ($("#segment-edit-general").is(':visible')) {
            if (e.ctrlKey || e.metaKey) {
                switch (String.fromCharCode(e.which).toLowerCase()) {
                    case 'q':
                        event.preventDefault();
                        talmaAcertarNomeRuaExec();
                        break;
                    case 'e':
                        event.preventDefault();
                        talmaAcertarNomeRuaLimpaAlternativo();
                        break;
                }
            }
        }
    },

    talmaAcertarNomeRuaInit = function () {
        var $body = $('body'),
            $doc = $(document);

        if ($body.data('acertaRuaBookmarkletSet')) {
            alert('Ajustar Nome da Rua: Recarregado!');
            return false;
        }

        $body.data('acertaRuaBookmarkletSet', true);

        talmaLog('Inicializado');

        $doc.ready(function () {
            $doc.on('keydown', talmaAcertarNomeRuaKeydown);
        });

        alert('Ajustar Nome da Rua: Pronto!');
    };

talmaAcertarNomeRuaInit();