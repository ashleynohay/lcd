//Start of Main_Layout global_inpage_javascript.js
$(document).ready(function(){
	
	$('.openDialog,.closeDialog').popup();
	
	CKEDITOR.replaceAll('editor');
	
	prepareList();
	showSideBar();
//	showImageEditor();
	accordionMenu();
	
	//JQUNIFORM
	$("input:checkbox, input:text, input:password, textarea, input:radio").uniform();
//-------------------------------------------------------------------------------------------------
        
//-------------------------------------------------------------------------------------------------
        //resize leftColumn navigation when it gets too long
        var has_images_column = $('#applicationContent').find('#applicationSideBar').attr('id');
        var module = $('body').attr('id');
        var multiplier = 1;
        
        if(module == 'image_library')
        {
        	multiplier = 2;
        }
        
        var left_column_height = (($('#leftColumn #heading:first').outerHeight() * multiplier) + $('#leftColumn #sideNavigation').outerHeight() + 20);
        if(has_images_column == 'applicationSideBar' || module == 'articles' || module == 'products' && has_images_column == 'applicationSideBar' ){
        	if(left_column_height > 600){
        		$('#leftColumn').css({
        			'height':'600px',
        			'overflow':'auto'
        		});
        		$('#nav_list span.nav,#leftColumn #heading,#sideNavigation').css({
        			'width':'279px'
        		});
        	}
        }


//-------------------------------------------------------------------------------------------------
        //Generate url for dialogs
        $('[class*="_dialog"] input[name="title"]').keyup(function(){
        	var url = $(this).val();
        	for(var i = url.length-1; i >=0; i--)
        		url = url.replace(' ','-');
        	$(this).closest('[class*="_dialog"]').find('input[name*="_url"]').val('/'+url.toLowerCase());
        });
        

        $(".closeDialog").live("click", function(){
        	$(".popupDialog").fadeOut();
        });

        
        
//-------------------------------------------------------------------------------------------------
        $(".remove_photo").on("click", function(){
    		var parent = $(this).parent();
    		
    		parent.find("#img").css("background-image", "url('')");
    		parent.find("input.image_id, input[name=image_id]").val('0');
    	});
});



//-------------------------------------------------------------------------------------------------

function showLoader(){
	$('body').append('<div class="loading hide"></div>');
}
function destroyLoader(){
	$('.loading').remove();
}
//-------------------------------------------------------------------------------------------------

function showSideBar(){
	$('#sideNavigation ul li').mouseover(function(){
		$('.articleSetting').removeClass('hide');
		$('.articleSetting').click(function(){
			$(this).closest('li').addClass('active');
			$('#applicationSideBar').show();
			
			closePopup('#applicationSideBar');
		});
	});
}

//----------------------------collapsable menu-----------------------
function accordionMenu() {
    $( "#accordionContainer" ).accordion({
    	collapsible: true
    });
}
//---------------------------show image editor--------------------
 function showImageEditor(){
	 $('.editImage').click(function(){
		 $('#photo_details_holder').show();
		 closePopup('#photo_details_holder');
	 });
 }
 
//----------------------------hide popUP-------------------------------
function closePopup(id){
	$(document).mouseup(function (e){
	    var container = $(id);
	    if (!container.is(e.target) && container.has(e.target).length ===  0) {
	        container.hide();
	        container.addClass('hide');
	        
	        $('#sideNavigation ul li').removeClass('active');
	    }
	});
}

//------------------collaspsable navigation for CMS---------
function prepareList() {
	$('#expList').find('li:has(ul)')
    .click( function(event) {
        if (this == event.target) {
        	$(this).toggleClass('collapsed');
        	$(this).toggleClass('expanded');
            $(this).children('ul').slideToggle('medium');
        }
        return false;
    })
    .addClass('collapsed')
    .children('ul').hide();
};


function reInitializedPlugins(){
//	$('#photo_details_holder').tabs();
	prepareList();
	showSideBar();
	showImageEditor();
	accordionMenu();
	$("input:checkbox, input:text, input:password, textarea, input:radio").uniform();
}
