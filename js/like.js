  
	$("document").ready(function(){
		playLaboratorio();
		cargaBuscador();

	}); 
	
		function like(reg){	
	var id = getParameterByName('idlaboratorio');

  		$.ajax({
     		url: "../admin/Controlador",
     		type: 'POST', 
     		dataType : 'json',
     		data : {
     			accion : "SUMALIKE",
				idRegistro:reg,
     		},
			error : function(jqXHR, textStatus, errorThrown) {
				alert(textStatus);
			},
			success : function(text, textstatus) {				
				var valor = parseInt($("#contador").html(),10)+1;				
				$("#contador").html(valor);
				/*$(jQuery.parseJSON(JSON.stringify(text))).each(function () {
					$("#contador").val(this.valor);              
                }	*/
				
				
			}

		});
	
	
	}

	function cargaBuscador(){

		
		$.ajax({
     		url: "../admin/Controlador",
     		type: 'POST', 
     		dataType : 'json',
     		data : {
     			accion : "CARGARBUSCADOR",
     		},
			error : function(jqXHR, textStatus, errorThrown) {
				alert(textStatus);
			},
			success : function(text, textstatus) {
				
		
				$("#header").html(text.html);
				$('.js-example-basic-single').select2();
				
			}

		});
		
		}
		
		
	function linkBusqueda(link){
		var v = link.options[link.selectedIndex].value;
		$(location).attr('href',"laboratorio_blue.html?idlaboratorio="+v); 
		 
	}

	function playLaboratorio(){	
	var id = getParameterByName('idlaboratorio');

  		$.ajax({
     		url: "../admin/Controlador",
     		type: 'POST', 
     		dataType : 'json',
     		data : {
     			accion : "PINTALABORATORIO",
				idLaboratorio:id,
				color:"blue"
     		},
			error : function(jqXHR, textStatus, errorThrown) {
				alert(textStatus);
			},
			success : function(text, textstatus) {
				
		
				$("#category-menu").html(text.html);
				var slideIndex = 1;
				document.addEventListener( 'DOMContentLoaded', function () {
            new Splide( '#splide', {
	type  : 'fade',
	rewind: true,
} ).mount();
        } );
		
		cargar();
		reg();
				
			}

		});
	
	
	}
	
	function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	
	
function cerrarPopper(){
  hideOverlay();
  let elements = document.getElementsByClassName("show");
  for (i = 0; i < elements.length; i++) {
    elements[i].classList.remove("show");
  }
  let sounds = document.getElementsByTagName("audio");
  for (i = 0; i < sounds.length; i++) sounds[i].pause();

}

function hideOverlay () {
  document.getElementById("overlay").classList.remove("show");
};


	function retorno(id){
		
		window.location.href  = 'categoria_blue.html?idcategoria='+id;
	}
	
	function playreg(reg){
		showSlides(1,reg)
	}	
	