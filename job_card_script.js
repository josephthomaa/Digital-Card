function initiateAjaxRequest(arrSearchData,url) {
	parameters = '';
	if(arrSearchData.length > 0 ) {
		for(i=0;i<arrSearchData.length;i++) {
			if(parameters == '')
				parameters = parameters + arrSearchData[i][0] + '=' + escape(arrSearchData[i][1]);
			else
				parameters = parameters +'&'+ arrSearchData[i][0] + '=' + escape(arrSearchData[i][1]);

		}
	}
	var jqxhr = $.ajax({
		  url: url,
		  type: "POST",
		  enctype: "multipart/form-data",
		  data: parameters
		  
			});
	
			jqxhr.success(function(){
				
				SuccessResponse(jqxhr);
			});
			jqxhr.error(function() {console.log(jqxhr); ServerError(); });
			jqxhr.complete(function() { jqxhr.abort(); });
}
function SuccessResponse(req) {
		
			if(tabModule == "Item Detail"){
			
			var	responseText = jQuery.trim(req.responseText);
				responseText = responseText.split("||");
				if(jQuery.trim(responseText[1]) == "session time out"){
					alert(jQuery.trim(responseText[1]));
					window.location.href = gAdminPath+"/login/login.php";
				}else if(jQuery.trim(responseText[0]) == "fail"){
					alert(jQuery.trim(responseText[1]));
				}else{
					$("#strItemCode").val(jQuery.trim(responseText[1]));
					$("#strItemName").val(jQuery.trim(responseText[1]));
					$("#fltItemSellingPrice").val(jQuery.trim(responseText[3]));
					$("#fltHiddenItemSellingPrice").val(jQuery.trim(responseText[3]));
					$("#fltItemSellingPriceCost").val(jQuery.trim(responseText[4]));
					$("#fltHiddenItemSellingPriceCost").val(jQuery.trim(responseText[4]));
					$("#intquantity").val("0");
					
					 
				}
		}else if(tabModule == "Add Pop Separeparts"){
			var	responseText = jQuery.trim(req.responseText);
			responseText = responseText.split("||");
			enterCount =0;
			if(jQuery.trim(responseText[1]) == "session time out"){
				alert(jQuery.trim(responseText[1]));
				window.location.href = gAdminPath+"/login/login.php";
			}else if(jQuery.trim(responseText[0]) == "fail"){
				alert(jQuery.trim(responseText[1]));
			}else{
				fltSparepartsAmount = $("#fltSparepartsAmount").val();
				fltItemAmount = $("#fltItemAmount").val();
				
				
//				if(Number(fltSpAmount) > Number(fltItemAmount))
//					fltSparepartsAmount = (Number(fltSparepartsAmount) - Number(fltSpAmount)) + (Number(fltSpAmount) - Number(fltItemAmount));
//				else
//					fltSparepartsAmount = (Number(fltSparepartsAmount) - Number(fltSpAmount)) + (Number(fltItemAmount) - Number(fltSpAmount));
//				
				fltSparepartsAmount = (Number(fltSparepartsAmount) + Number(fltItemAmount)) -  Number(fltSpAmount);
				
				if(!$.isNumeric(fltSparepartsAmount)){
					$("#fltSparepartsAmount").attr("readonly", false); 
				}
				
				fltSparepartsAmount = Number(fltSparepartsAmount).toFixed(2);
				
				$("#fltSparepartsAmount").val(fltSparepartsAmount);
				$(".nyroModalBg").hide();
				$(".nyroModalCont").hide();
				$(".nyroModalClose").hide();
				
				
				$("#intToGroupId").val(responseText[2]);
				$("#addSpareparts").hide();
				$("#editSpareparts").show();
				 getTotalWorkAmount();
				clearAryValue();
				clearOwlAryValue();
			}
		}else if(tabModule == "Update Pop Separeparts"){
			var	responseText = jQuery.trim(req.responseText);
			responseText = responseText.split("||");
			enterCount =0;
			if(jQuery.trim(responseText[1]) == "session time out"){
				alert(jQuery.trim(responseText[1]));
				window.location.href = gAdminPath+"/login/login.php";
			}else if(jQuery.trim(responseText[0]) == "fail"){
				alert(jQuery.trim(responseText[1]));
			}else{
				
				fltSparepartsAmount = $("#fltSparepartsAmount").val();
				fltItemAmount = $("#fltItemAmount").val();
				
//				if(Number(fltSpAmount) > Number(fltItemAmount))
//					fltSparepartsAmount = (Number(fltSparepartsAmount) - Number(fltSpAmount)) +  Number(fltItemAmount);
//				else
//					fltSparepartsAmount = (Number(fltSparepartsAmount) - Number(fltSpAmount)) +  Number(fltItemAmount);
				fltSparepartsAmount = (Number(fltSparepartsAmount) + Number(fltItemAmount)) -  Number(fltSpAmount);
				
				
				if(!$.isNumeric(fltSparepartsAmount)){
					$("#fltSparepartsAmount").attr("readonly", false); 
				}
				fltSparepartsAmount = Number(fltSparepartsAmount).toFixed(2);
				$("#fltSparepartsAmount").val(fltSparepartsAmount);
				$(".nyroModalBg").hide();
				$(".nyroModalCont").hide();
				$(".nyroModalClose").hide();
				
				if(aryItemId.length == 0){
					$("#intToGroupId").val("");
					$("#editSpareparts").hide();
					$("#addSpareparts").show();
				}	
				 getTotalWorkAmount();
				clearAryValue();
				clearOwlAryValue();
			}
		}else if(tabModule == "Add PRF Pop Separeparts"){
			var	responseText = jQuery.trim(req.responseText);
			responseText = responseText.split("||");
			enterCount =0;
			if(jQuery.trim(responseText[1]) == "session time out"){
				alert(jQuery.trim(responseText[1]));
				window.location.href = gAdminPath+"/login/login.php";
			}else if(jQuery.trim(responseText[0]) == "fail"){
				alert(jQuery.trim(responseText[1]));
			}else{
				
				$(".nyroModalBg").hide();
				$(".nyroModalCont").hide();
				$(".nyroModalClose").hide();
				
				
				$("#intPrfId").val(responseText[2]);
				$("#addPrf").hide();
				$("#editPrf").show();
				 getTotalWorkAmount();
				clearAryValue();
				clearOwlAryValue();
				if(jQuery.trim(responseText[3]) == 'Save & Print'){
					var intJobCardId = jQuery.trim($("#intJobCardId").val());
					if(intJobCardId == ''){
						alert("Jobcard should be saved first");
					}else{
						href = gAdminPath+"/prf/prf_pdf.php?event=pdf&intPrfId="+responseText[2]+"&intJobCardId="+intJobCardId;
						window.open(href,"_blank",'PopUp'+responseText[2]+',scrollbars=1,menubar=0,resizable=1,width=1200,height=700');
					}
				}
			}
		}else if(tabModule == "Update PRF Pop Separeparts"){
			var	responseText = jQuery.trim(req.responseText);
			responseText = responseText.split("||");
			enterCount =0;
			if(jQuery.trim(responseText[1]) == "session time out"){
				alert(jQuery.trim(responseText[1]));
				window.location.href = gAdminPath+"/login/login.php";
			}else if(jQuery.trim(responseText[0]) == "fail"){
				alert(jQuery.trim(responseText[1]));
			}else{
				
				
				$(".nyroModalBg").hide();
				$(".nyroModalCont").hide();
				$(".nyroModalClose").hide();
				
				if(aryItemNameP.length == 0){
					$("#intPrfId").val("");
					$("#editPrf").hide();
					$("#addPrf").show();
				}	
				 getTotalWorkAmount();
				clearAryValue();
				clearOwlAryValue();
				if(jQuery.trim(responseText[3]) == 'update & print'){
					var intJobCardId = jQuery.trim($("#intJobCardId").val());
					if(intJobCardId == ''){
						alert("Jobcard should be saved first");
					}else{
						href = gAdminPath+"/prf/prf_pdf.php?event=pdf&intPrfId="+responseText[2]+"&intJobCardId="+intJobCardId;
						window.open(href,"_blank",'PopUp'+responseText[2]+',scrollbars=1,menubar=0,resizable=1,width=1200,height=700');
					}
				}
			}	
		}else if(tabModule == "Update PRF List"){
			var	responseText = jQuery.trim(req.responseText);
			responseText = responseText.split("||");
			enterCount =0;
			if(jQuery.trim(responseText[1]) == "session time out"){
				alert(jQuery.trim(responseText[1]));
				window.location.href = gAdminPath+"/login/login.php";
			}else if(jQuery.trim(responseText[0]) == "fail"){
				alert(jQuery.trim(responseText[1]));
			}else{
				
				fltSparepartsAmount = $("#fltSparepartsAmount").val();
				fltItemAmount = $("#fltItemAmountP").val();
			
				//if(Number(fltSpAmountPrf) > Number(fltItemAmount))
					fltSparepartsAmount = (Number(fltSparepartsAmount) + Number(fltItemAmount)) -  Number(fltSpAmountPrf);
				//else if
					//fltSparepartsAmount = (Number(fltSparepartsAmount) - Number(fltSpAmountPrf)) + Number(fltItemAmount) ;
				
					
					if(!$.isNumeric(fltSparepartsAmount)){
						$("#fltSparepartsAmount").attr("readonly", false); 
					}
				fltSparepartsAmount = Number(fltSparepartsAmount).toFixed(2);
				
				$("#fltSparepartsAmount").val(fltSparepartsAmount);
				alert("PRF List added successfully");
				$(".nyroModalBg").hide();
				$(".nyroModalCont").hide();
				$(".nyroModalClose").hide();
				
				if(aryItemId.length == 0){
					$("#intPrfId").val("");
					$("#editPrf").hide();
					$("#addPrf").show();
				}	
				 getTotalWorkAmount();
				clearAryValue();
				clearOwlAryValue();
			}	
		}else if(tabModule == "Owl Detail"){
			
			var	responseText = jQuery.trim(req.responseText);
				responseText = responseText.split("||");
				if(jQuery.trim(responseText[1]) == "session time out"){
					alert(jQuery.trim(responseText[1]));
					window.location.href = gAdminPath+"/login/login.php";
				}else if(jQuery.trim(responseText[0]) == "fail"){
					alert(jQuery.trim(responseText[1]));
				}else{
					$("#strOwlCode").val(jQuery.trim(responseText[1]));
					$("#strOwlName").val(jQuery.trim(responseText[1]));
					$("#fltOwlSellingPrice").val(jQuery.trim(responseText[3]));
					$("#fltOwlHiddenOwlSellingPrice").val(jQuery.trim(responseText[3]));
					$("#fltOwlSellingPriceCost").val(jQuery.trim(responseText[4]));
					$("#fltOwlHiddenOwlSellingPriceCost").val(jQuery.trim(responseText[4]));
					$("#intOwlquantity").val("0");
					
					 
				}
		}else if(tabModule == "Add Pop Owl"){
			var	responseText = jQuery.trim(req.responseText);
			responseText = responseText.split("||");
			enterCount =0;
			if(jQuery.trim(responseText[1]) == "session time out"){
				alert(jQuery.trim(responseText[1]));
				window.location.href = gAdminPath+"/login/login.php";
			}else if(jQuery.trim(responseText[0]) == "fail"){
				alert(jQuery.trim(responseText[1]));
			}else{
				$("#fltOwlAmountPop").val($("#fltOwlAmount").val());
				$(".nyroModalBg").hide();
				$(".nyroModalCont").hide();
				$(".nyroModalClose").hide();
				
				
				$("#intOwlToGroupId").val(responseText[2]);
				$("#addOwlPop").hide();
				$("#editOwlPop").show();
				 getTotalWorkAmount();
				clearAryValue();
				clearOwlAryValue();
			}
		}else if(tabModule == "Update Pop Owl"){
			var	responseText = jQuery.trim(req.responseText);
			responseText = responseText.split("||");
			enterCount =0;
			if(jQuery.trim(responseText[1]) == "session time out"){
				alert(jQuery.trim(responseText[1]));
				window.location.href = gAdminPath+"/login/login.php";
			}else if(jQuery.trim(responseText[0]) == "fail"){
				alert(jQuery.trim(responseText[1]));
			}else{
				
				$("#fltOwlAmountPop").val($("#fltOwlAmount").val());
				$(".nyroModalBg").hide();
				$(".nyroModalCont").hide();
				$(".nyroModalClose").hide();
				
				if(aryOwlId.length == 0){
					$("#intOwlToGroupId").val("");
					$("#editOwlPop").hide();
					$("#addOwlPop").show();
				}	
				 getTotalWorkAmount();
				clearAryValue();
				clearOwlAryValue();
			}
		}else if(tabModule == "Add File Attach" || tabModule == "Update File Attach"){
			var	responseText = jQuery.trim(req.responseText);
			responseText = responseText.split("||");
			if(jQuery.trim(responseText[1]) == "session time out"){
				alert(jQuery.trim(responseText[1]));
				window.location.href = gAdminPath+"/login/login.php";
			}else if(jQuery.trim(responseText[0]) == "fail"){
				alert(jQuery.trim(responseText[1]));
			}else{
					$(".nyroModalBg").hide();
					$(".nyroModalCont").hide();
					$(".nyroModalClose").hide();
					
				
					if(arySystemName.length > 0){
						$("#intAttachGroupId").val(jQuery.trim(responseText[2]));
						$("#addAttachment").hide();
						$("#editAttachment").show();
					}else if(arySystemName.length == 0){
						$("#intAttachGroupId").val("");
						$("#editAttachment").hide();
						$("#addAttachment").show();
						
					}	
					clearAryValue();
					clearOwlAryValue();
			}
		}else if(tabModule == "Get Vehicle List"){
			var	responseText = jQuery.trim(req.responseText);
			responseText = responseText.split("||");
			if(jQuery.trim(responseText[1]) == "session time out"){
				alert(jQuery.trim(responseText[1]));
				window.location.href = gAdminPath+"/login/login.php";
			}else if(jQuery.trim(responseText[0]) == "fail"){
				alert(jQuery.trim(responseText[1]));
			}else{
				
				if(Number(jQuery.trim(responseText[3])) == 1){
					$("#vehicleDetail").html("");
					$("#vehicleDetail").html(jQuery.trim(responseText[2]));
					$("#strModel").val(jQuery.trim(responseText[7]));
					$("#strRegistrationNumber").val(jQuery.trim(responseText[8]));
					$("#intYear").val(jQuery.trim(responseText[10]));
					$("#intChassisNumber").val(jQuery.trim(responseText[11]));
					$("#fltMileage").val(jQuery.trim(responseText[9]));
					$("#strVehicleType").val(jQuery.trim(responseText[12]));
					$("#strFuelType").val(jQuery.trim(responseText[13]));
					$("#intCylinder").val(jQuery.trim(responseText[14]));
					$("#strContactTelephone").val(jQuery.trim(responseText[1]));
				}else if(Number(jQuery.trim(responseText[3])) >= 2){
					$("#vehicleDetail").html("");
					$("#vehicleDetail").html(jQuery.trim(responseText[2]));
					$("#strContactTelephone").val(jQuery.trim(responseText[1]));
					$("#strModel").val("");
					$("#strRegistrationNumber").val("");
					$("#intYear").val("");
					$("#intChassisNumber").val("");
					$("#fltMileage").val("");
					$("#strVehicleType").val("");
					$("#strFuelType").val("");
					$("#intCylinder").val("");
				}else{
					
					$("#strContactTelephone").val(jQuery.trim(responseText[1]));
					$("#vehicleDetail").html("");
					$("#vehicleDetail").html(jQuery.trim(responseText[2]));
					$("#strModel").val("");
					$("#strRegistrationNumber").val("");
					$("#intYear").val("");
					$("#intChassisNumber").val("");
					$("#fltMileage").val("");
					$("#strVehicleType").val("");
					$("#strFuelType").val("");
					$("#intCylinder").val("");
				}
				
				
				 
			}
		}else if(tabModule == "Vehicle Detail"){
			var	responseText = jQuery.trim(req.responseText);
			responseText = responseText.split("||");
			if(jQuery.trim(responseText[1]) == "session time out"){
				alert(jQuery.trim(responseText[1]));
				window.location.href = gAdminPath+"/login/login.php";
			}else if(jQuery.trim(responseText[0]) == "fail"){
				alert(jQuery.trim(responseText[1]));
			}else{
				$("#strModel").val(jQuery.trim(responseText[7]));
				$("#strRegistrationNumber").val(jQuery.trim(responseText[8]));
				$("#intYear").val(jQuery.trim(responseText[10]));
				$("#intChassisNumber").val(jQuery.trim(responseText[11]));
				$("#fltMileage").val(jQuery.trim(responseText[9]));
				$("#strVehicleType").val(jQuery.trim(responseText[12]));
				$("#strFuelType").val(jQuery.trim(responseText[13]));
				$("#intCylinder").val(jQuery.trim(responseText[14]));
				
				
				 
			}	
		}else if(tabModule == "Work Detail"){
			var	responseText = jQuery.trim(req.responseText);
			responseText = responseText.split("||");
			if(jQuery.trim(responseText[1]) == "session time out"){
				alert(jQuery.trim(responseText[1]));
				window.location.href = gAdminPath+"/login/login.php";
			}else if(jQuery.trim(responseText[0]) == "fail"){
				alert(jQuery.trim(responseText[1]));
			}else{
				$("#strWorkDescription").val(jQuery.trim(responseText[1]));
				$("#fltWorkHour").val(jQuery.trim(responseText[2]));
				$("#fltWorkUnitPrice").val(jQuery.trim(responseText[3]));
				$("#fltWorkUnitPrice1").val(jQuery.trim(responseText[3]));
				$("#fltWorkUnitPrice2").val(jQuery.trim(responseText[4]));
				$("#fltWorkUnitPrice3").val(jQuery.trim(responseText[5]));
				var fltWorkNetAmount =  Number(responseText[3]);
					fltWorkNetAmount = Number(fltWorkNetAmount).toFixed(2);
					$("#fltWorkNetAmount").val(jQuery.trim(fltWorkNetAmount));
			}		
		
			
		}else if(tabModule == "Update Job Card"){
			
			var	responseText = jQuery.trim(req.responseText);
				responseText = responseText.split("||");
				enterCount = 0;
				if(jQuery.trim(responseText[1]) == "session time out"){
					alert(jQuery.trim(responseText[0]));
					window.location.href = gAdminPath+"/login/login.php";
				}else if(jQuery.trim(responseText[0]) == "fail"){
					alert(jQuery.trim(responseText[1]));
				}else if(jQuery.trim(responseText[2]) == "pdf"){ 
					var page = jQuery.trim($("#page").val());
					href = gAdminPath+"/job_card/job_card_pdf.php?event="+responseText[2]+"&intJobCardId="+responseText[3];
					   window.open(href,"_blank",'PopUp'+responseText[3]+',scrollbars=1,menubar=0,resizable=1,width=1200,height=700');
					 
					}else{
					var page = jQuery.trim($("#page").val());
					alert("Job Card updated successfully");
					
				}
				 if(jQuery.trim(responseText[0]) == "sucess"){
					  setTimeout(function(){
						  window.location.href = gAdminPath+"/job_card/job_card_list.php";
						//  window.location.href = gAdminPath+"/job_card/edit_job_card.php?intJobCardId="+responseText[3];
				          },1000);
			            
					
				} 
		}else if(tabModule == "Add Staff Work Amount"){
			
			var	responseText = jQuery.trim(req.responseText);
				responseText = responseText.split("||");
				enterCount = 0;
				if(jQuery.trim(responseText[1]) == "session time out"){
					alert(jQuery.trim(responseText[0]));
					window.location.href = gAdminPath+"/login/login.php";
				}else if(jQuery.trim(responseText[0]) == "fail"){
					alert(jQuery.trim(responseText[1]));
					 
				}else{
					$(".nyroModalBg").hide();
					$(".nyroModalCont").hide();
					$(".nyroModalClose").hide();
					var page = jQuery.trim($("#page").val());
					alert("Job Card closed successfully");
					//window.location.href = gAdminPath+"/job_card/job_card_list.php?page="+page;
					$('#filter').trigger('click');
				}
		
		}else if(tabModule == "getMore"){
			
			var	responseText = jQuery.trim(req.responseText);
				responseText = responseText.split("||");
				enterCount = 0;
				if(jQuery.trim(responseText[1]) == "session time out"){
					alert(jQuery.trim(responseText[0]));
					window.location.href = gAdminPath+"/login/login.php";
				}else if(jQuery.trim(responseText[0]) == "fail"){
					alert(jQuery.trim(responseText[1]));
					 
				}else{
					$("#more_"+jQuery.trim(responseText[2])).html("");
					$("#more_"+jQuery.trim(responseText[2])).html(jQuery.trim(responseText[1]));
				}		 
		}		
}
function callPrint(iframeId) {
   
	  var PDF = document.getElementById(iframeId);
	      PDF.focus();
	      PDF.contentWindow.print();
	    
	  
    
    
   
}
function ServerError() {
	alert('Error in processing request');
			tabModule = "";
}
var jobcardList = {
	    init: function () {
	    	
	    	$(".jobCardClose").live('click',function(e){ 
	            e.preventDefault();
	            if(confirm('Make sure all work is completed')){
		            var intJobCardId = jQuery.trim($(this).attr('id'));
		            	intJobCardId = intJobCardId.split("_");
		            var strJobCardNumber = 	jQuery.trim($("#strJobCardNumber_"+intJobCardId[1]).html());
		            var fltTotalWorkAmount = 	jQuery.trim($("#fltTotalWorkAmount_"+intJobCardId[1]).val());
		            alert(intJobCardId);
		            	$.nmManual(gAdminPath+"/job_card/job_card_close.php?intJobCardId="+intJobCardId[1]+"&strJobCardNumber="+strJobCardNumber+"&fltTotalWorkAmount="+fltTotalWorkAmount);
		       }
	    	});  
	    	
	    	
	    	$("#addStaff").live( "click", function() {
	    		
    			var error = 0;
    			 $("#intSlNo").focus();		
    			
    				 var intStaffId = jQuery.trim($("#intStaffId").val());
    				 var strRemark = jQuery.trim($("#strRemark").val());
    				 var fltAmount = jQuery.trim($("#fltAmount").val());
    				 var fltBalanceAmount = jQuery.trim($("#fltBalanceAmount").val());
 		    		 var fltTotalAmount = jQuery.trim($("#fltTotalAmount").val());
 		    		 var count = jQuery.trim($("#count").val());
 		    		 if(intStaffId != "" ){
    					 strStaffName = jQuery.trim($("#intStaffId option:selected").text());
    					
    				 }else{
    					 
    					 alert("Select the staff");
    					 $("#intStaffId").focus();
    						 
    					 error = 1;
    				 }
    				
 		    		 
    				 	
    				 
    					 if(error == 0){
    					
    						
    						 
	    					 var aryCount = 0;
	    					
	    					if(!IsNumeric(fltAmount) || Number(fltBalanceAmount) <= 0){ 
	    				 		alert("The amount should be a valid integer greater than 0.");		
	    				 		 $("#intquantity").focus();
	    				 		 error = 1;
	    				 	}else if(Number(fltAmount) > Number(fltBalanceAmount)){ 
	    				 		alert("The amount is greater than balance amount");	
	    						 $("#fltAmount").focus();
	    						 error = 1; 
	    					}else{
	    						 for($i=0;$i<Number(count);$i++){
	        						 if(intStaffId == jQuery.trim($("#intStaffId_"+$i).val())){
	        							alert("This staff name already added");
	        							 error = 1;
	        							 break;
	        						 } 
	        					 }
	    					}
	    						
	    					if(error == 0){
	    						aryCount = Number(count);
	    						count = Number(count) + 1;	
    								$('#staffList > tbody:last').append("<tr id=\"at_"+aryCount+"\"  class=\"nodrag nodrop invoice-row-total\">" +
    									 "<td style=\"width: 50px;\" >"+count+"</td>" +
    									 "<td id=\"strStaffName_"+aryCount+"\">"+strStaffName+"</td>" +
    									 "<td><input type=\"text\" name=\"strRemark\" class=\"strRemark\" id=\"strRemark_"+aryCount+"\" value=\""+strRemark+"\"></td>" +
    									 "<td class=\"td-right\"><input type=\"text\" name=\"fltAmount\" class=\"fltAmount\" id=\"fltAmount_"+aryCount+"\" value=\""+fltAmount+"\" style=\"width: 70px;text-align: right;\"></td>" +
     									"<td class=\"td-center\">" +
    									 	"<input type=\"hidden\"  name=\"intStaffId_"+aryCount+"\"  id=\"intStaffId_"+aryCount+"\" value=\""+intStaffId+"\" />"+
    									"</td>" +
    								 "</tr>");
    								
    								fltBalanceAmount = Number(fltBalanceAmount) - Number(fltAmount);
    				    			fltBalanceAmount = Number(fltBalanceAmount).toFixed(2);
    				    			$("#fltBalanceAmount").val(fltBalanceAmount);
    				    			 $("#count").val(count);
    								 count = Number(count) + 1;	 
     				    			$("#intSlNo").val(count);
    								 $("#intStaffId").val("");
    								 $("#strRemark").val("");
    								 $("#fltAmount").val("0.00");
    								 $("#intSlNo").focus();
    								 $(".addStaff").css("color","white");
    								
    					}
    				}	 
    			
    			if( error == 1)
    				return false;
    			else
    				return true;
    		});
	    	
	    	
	    	
	            $(".fltAmount").live( "change", function() {
	            	var fltAmount = jQuery.trim($(this).val());
	            	var fltBalanceAmount = jQuery.trim($("#fltBalanceAmount").val());
		    		var fltTotalAmount = jQuery.trim($("#fltTotalAmount").val());
		    		var count = jQuery.trim($("#count").val());
		    		var fltStaffTotalAmount = "0.00";
		    		
		    		for($i=0;$i<Number(count);$i++){
		    			fltStaffTotalAmount = Number(fltStaffTotalAmount) + Number(jQuery.trim($("#fltAmount_"+$i).val()));
			  		}
		    		
		    		if(Number(fltStaffTotalAmount) > Number(fltTotalAmount)){
		    			$(this).val("0.00");
		    			alert("The amount is greater than balance amount");
		    		}else{
		    			fltBalanceAmount = Number(fltTotalAmount) - Number(fltStaffTotalAmount);
		    			fltBalanceAmount = Number(fltBalanceAmount).toFixed(2);
		    			$("#fltBalanceAmount").val(fltBalanceAmount);
		    		}
	            });
	            
	            
	            $("#addStaffWorkAmt").live( "click", function() {
		    		
		    		var intJobCardId = jQuery.trim($("#intJobCardId").val());
		    		var strJobCardNumber = jQuery.trim($("#strJobCardNumber").val());
		    		var fltBalanceAmount = jQuery.trim($("#fltBalanceAmount").val());
		    		var fltTotalAmount = jQuery.trim($("#fltTotalAmount").val());
		    		var dateClose = jQuery.trim($("#dateClose").val());
		    		var count = jQuery.trim($("#count").val());
		    		var aryStaffId  = new Array();
		    		var aryStaffName  = new Array();
		    		var aryRemark  = new Array();
		    		var aryAmount  = new Array();
		    		
		    		if(Number(fltBalanceAmount) != Number('0.00')){
		    			
		    			alert("The balance amount should be zero");
		    		}else{
		    			for($i=0;$i<Number(count);$i++){
		    				aryStaffId[$i] = jQuery.trim($("#intStaffId_"+$i).val());
		    				aryStaffName[$i] = jQuery.trim($("#strStaffName_"+$i).html());
		    				aryRemark[$i] = jQuery.trim($("#strRemark_"+$i).val());
		    				aryAmount[$i] = jQuery.trim($("#fltAmount_"+$i).val());
		    			}
		    		
			    		if(enterCount == 0){
		    				tabModule = "Add Staff Work Amount"; 
			    			arrSearch = new Array(0);
			    			arrSearch[0] = new Array(0);
			    			arrSearch[0][0] = 'intJobCardId';
			    			arrSearch[0][1] =  intJobCardId;
			    			arrSearch[1] = new Array(0);
			    			arrSearch[1][0] = 'aryAmount';
			    			arrSearch[1][1] =  aryAmount;
			    			arrSearch[2] = new Array(0);
			    			arrSearch[2][0] = 'aryStaffId';
			    			arrSearch[2][1] =  aryStaffId;
			    			arrSearch[3] = new Array(0);
			    			arrSearch[3][0] = 'aryStaffName';
			    			arrSearch[3][1] =  aryStaffName;
			    			arrSearch[4] = new Array(0);
			    			arrSearch[4][0] = 'aryRemark';
			    			arrSearch[4][1] =  aryRemark;
			    			arrSearch[5] = new Array(0);
			    			arrSearch[5][0] = 'strJobCardNumber';
			    			arrSearch[5][1] =  strJobCardNumber;
			    			arrSearch[6] = new Array(0);
			    			arrSearch[6][0] = 'dateClose';
			    			arrSearch[6][1] =  dateClose;
			    			arrSearch[7] = new Array(0);
			    			arrSearch[7][0] = 'event';
			    			arrSearch[7][1] = 'addStaffWorkAmt';
			    			
			    		
			    			enterCount =1;
			    			initiateAjaxRequest(arrSearch,gAdminPath+"/job_card/job_card_close.php");
			    		}else{
			    			alert("Please wait");
			    		}
		    		}	
	            });
	            
	            
	            $(".more_button").live( "click", function(e) {
	            	  e.preventDefault();
		    		var intJobCardId = jQuery.trim($(this).attr('id'));
		    		
		    		intJobCardId = intJobCardId.split("_");
			    		if(enterCount == 0){
		    				tabModule = "getMore";
		    				arrSearch = new Array(0);
			    			arrSearch[0] = new Array(0);
			    			arrSearch[0][0] = 'intJobCardId';
			    			arrSearch[0][1] =  intJobCardId[1];
			    			arrSearch[1] = new Array(0);
			    			arrSearch[1][0] = 'event';
			    			arrSearch[1][1] = 'getMore';
			    			
			    		
			    			enterCount =1;
			    			initiateAjaxRequest(arrSearch,gAdminPath+"/job_card/job_card_list.php");
			    		}else{
			    			alert("Please wait");
			    		}
		    		
	            });
	    }
}
	    	
var jobcard = {
	    init: function () {
	    	$("input#utc_date_trans").datepicker();
	    	$("input#utc_date_lpo").datepicker();
	    	
	    	
	    	$(".addSpareparts").live('click',function(e){ 
	            e.preventDefault();
	            var intToGroupId = jQuery.trim($("#intToGroupId").val());
	            var intJobCardId = jQuery.trim($("#intJobCardId").val());
	            if(intToGroupId == ""){
	            	$.nmManual(gAdminPath+"/spareparts_jc/add_spareparts_jc.php?intJobCardId="+intJobCardId);
	            }else{
	            	$.nmManual(gAdminPath+"/spareparts_jc/edit_spareparts_jc.php?intJobCardId="+intJobCardId+"&intToGroupId="+intToGroupId);
	            }	
	            setTimeout(function(){
	            	fltSpAmount = $("#fltItemAmount").val(); 
	            },1000);
	 	 	});
	    	
	    	
	    	$(".addOwlPop").live('click',function(e){ 
	            e.preventDefault();
	            var intOwlToGroupId = jQuery.trim($("#intOwlToGroupId").val());
	            var intJobCardId = jQuery.trim($("#intJobCardId").val());
	            if(intOwlToGroupId == ""){
	            	$.nmManual(gAdminPath+"/owl_work_jc/add_owl_work_jc.php?intJobCardId="+intJobCardId);
	            }else{
	            	$.nmManual(gAdminPath+"/owl_work_jc/edit_owl_work_jc.php?intJobCardId="+intJobCardId+"&intOwlToGroupId="+intOwlToGroupId);
	            }	
	 	 	});
	    	
	    	$(".addAttachment").live('click',function(e){ 
	            e.preventDefault();
	            var intAttachGroupId = jQuery.trim($("#intAttachGroupId").val());
	            if(intAttachGroupId == ""){
	            	$.nmManual(gAdminPath+"/attachment/add_file_attachment.php");
	            }else{
	            	$.nmManual(gAdminPath+"/attachment/edit_file_attachment.php?intAttachGroupId="+intAttachGroupId);
	            }	
	 	 	});
	    	
	    	$(".addPrf").live('click',function(e){ 
	            e.preventDefault();
	            var intPrfId = jQuery.trim($("#intPrfId").val());
	            var intJobCardId = jQuery.trim($("#intJobCardId").val());
	            if(intPrfId != ""){
	            	alert("PRF already entered");
	            }
	            $.nmManual(gAdminPath+"/prf/add_prf.php?intJobCardId="+intJobCardId);
	            /*if(intPrfId == ""){
	            	$.nmManual(gAdminPath+"/prf/add_prf.php?intJobCardId="+intJobCardId);
	            }else{
	            	$.nmManual(gAdminPath+"/prf/edit_prf.php?intJobCardId="+intJobCardId+"&intPrfId="+intPrfId);
	            }*/	
	 	 	});

	    	$(".addPrfList").live('click',function(e){ 
	            e.preventDefault();
	            var intJobCardId = jQuery.trim($("#intJobCardId").val());
	            	$.nmManual(gAdminPath+"/prf/prf_list_pop.php?intJobCardId="+intJobCardId);
	            	 setTimeout(function(){
	 	            	fltSpAmountPrf = $("#fltItemAmountP").val(); 
	 	            },1000);
	 	 	});
	    	
	    }
};

var separeparts = {
	    init: function () {
	    	
	    	$(".nyroModalBg,  .nyroModalClose").live('click',function(e){ 
				clearAryValue();
				clearOwlAryValue();
    			
	    	});
	    	
	    	$(".itemDetail").live( "click", function() {
	    		
	    		var intItem = jQuery.trim($(this).val());
	    		if(jQuery.trim(intItem) != ""){
	    			intItemId = intItem;
	    			$("#intItemId").val(intItemId);
	    			tabModule = "Item Detail"; 
	    			arrSearch = new Array(0);
	    			arrSearch[0] = new Array(0);
	    			arrSearch[0][0] = 'intItemId';
	    			arrSearch[0][1] =  intItemId;
	    			arrSearch[1] = new Array(0);
	    			arrSearch[1][0] = 'event';
	    			arrSearch[1][1] = 'getItemDetail';
	    			initiateAjaxRequest(arrSearch,gAdminPath+"/spareparts_jc/add_spareparts_jc.php");
	    		}else if(jQuery.trim(intItem) == ""){
	    			$("#strItemCode").val("");
	    			$("#strItemName").val("");
	    			$("#fltItemSellingPrice").val("0.00");
	    			$("#intquantity").val("0");
	    			$("#fltItemSellingPriceCost").val("0.00");
	    			$("#fltNetAmount").val("0.00");
	    			$("#intItemId").val("");
	    		}
	    	});
	    	
	  
	    	$(".callSalesSingleItem").live( "change", function() {
	    		callSalesSingleItem();
	    		
	    	});
	    	
	    	
	    	$("#addItem").live( "click", function() {
	    		
    			var error = 0;
    			 $("#intSlNo").focus();		
    			 
    				 var intItemId = jQuery.trim($("#strItemCode").val());
    				 var strItemCode = jQuery.trim($("#strItemCode").val());
    				 var strItemName = jQuery.trim($("#strItemName").val());
    				 var strItem = "";
    				 var outOfStock = "";
    				 if(strItemCode != "" && strItemName != ""){
    					 strItemCode = jQuery.trim($("#strItemCode option:selected").text());
    					 strItemName = jQuery.trim($("#strItemName option:selected").text());
    					
    				 }else{
    					 
    					 alert("Enter all field with correct values");
    					 $("#strItemCode").focus();
    						 
    					 error = 1;
    				 }
    				 if(aryItemCode.length > 0){
    					 for(var i=0;i<aryItemCode.length;i++){
    						 if(strItemCode == aryItemCode[i]){
    							alert("The item already exist");
    							 error = 1;
    							 break;
    						 } 
    					 }
    				 }
    				 if(error == 0){
    					
    					 var intquantity = jQuery.trim($("#intquantity").val());
    					 
    					 var fltItemSellingPrice = jQuery.trim($("#fltItemSellingPrice").val());
    					 var fltItemSellingPriceCost = $("#fltItemSellingPriceCost").val();
    					 var fltHiddenItemSellingPrice = $("#fltHiddenItemSellingPrice").val();
    					 var fltHiddenItemSellingPriceCost = $("#fltHiddenItemSellingPriceCost").val();
    					 var fltDiscount = jQuery.trim($("#fltDiscount").val());
    					 var fltUnitPrice = jQuery.trim($("#fltUnitPrice").val());
    					 var fltNetAmount = jQuery.trim($("#fltNetAmount").val());
    					 var fltItemAmount = jQuery.trim($("#fltItemAmount").val());
    					 var count = jQuery.trim($("#intSlNo").val());
    					 var aryCount = 0;
    					
    					 if(!IsNumeric(intquantity) || Number(intquantity) <= 0){ 
    				 		alert("The quantity should be a valid integer greater than 0.");		
    				 		 $("#intquantity").focus();
    				 		 error = 1;
    				 	}else if(!IsNumeric(fltItemSellingPrice) || Number(fltItemSellingPrice) <= 0){ 
    				 		alert("The unit price should be a valid integer greater than 0.");		
    						 $("#fltItemSellingPrice").focus();
    						 error = 1; 
    					}else if(error == 0){
    								salescalTotalAmount(fltNetAmount,fltItemAmount);
    								
    								
    								var intTotalItemQuantity = jQuery.trim($("#intTotalItemQuantity").val());
    								intTotalItemQuantity = Number(intTotalItemQuantity) + Number(intquantity);
    								$("#intTotalItem").val(jQuery.trim($("#intSlNo").val()));
    								$("#intTotalItemQuantity").val(intTotalItemQuantity);
    								aryCount = Number(count)-1;
    								arySlNo[aryCount] = count;
    								aryItemId[aryCount] = intItemId;
    								aryItemCode[aryCount] = strItemCode;
    								aryItemName[aryCount] = strItemName;
    								aryQuantity[aryCount] = intquantity;
    								aryDiscount[aryCount] = fltDiscount;
    								aryUnitPrice[aryCount] = fltUnitPrice;
    								aryNetAmount[aryCount] = fltNetAmount;
    								aryItemSellingPrice[aryCount] =fltItemSellingPrice;
    								aryItemSellingPriceCost[aryCount] = fltItemSellingPriceCost;
    								aryHiddenItemSellingPrice[aryCount] = fltHiddenItemSellingPrice;
    								aryHiddenItemSellingPriceCost[aryCount] = fltHiddenItemSellingPriceCost;
    								 $('#itemList > tbody:last').append("<tr id=\"sp_"+aryCount+"\"  class=\"nodrag nodrop invoice-row-total\">" +
    									 "<td style=\"width: 50px;\" >"+count+"</td>" +
    									 "<td>"+strItemCode+"</td>" +
    									 "<td>"+strItemName+"</td>" +
    									 "<td class=\"td-right\" id=\"intquantity_"+aryCount+"\" >"+intquantity+"</td>" +
    									 "<td class=\"td-right\" id=\"fltItemSellingPrice_"+aryCount+"\" >"+fltItemSellingPrice+"</td>" +
    									 "<td class=\"td-right\" id=\"fltDiscount_"+aryCount+"\" >"+fltDiscount+"</td>" +
    									 "<td class=\"td-right\" id=\"fltUnitPrice_"+aryCount+"\" >"+fltUnitPrice+"</td>" +
    									"<td class=\"td-right\" id=\"fltNetAmount_"+aryCount+"\" >"+fltNetAmount+"</td>" +
    	 									 "<td class=\"td-center\">" +
    									 	"<input type=\"hidden\"  name=\"fltHiddenItemSellingPrice_"+aryCount+"\"  id=\"fltHiddenItemSellingPrice_"+aryCount+"\" value=\""+fltHiddenItemSellingPrice+"\" />"+
    									 	"<input type=\"hidden\"  name=\"fltHiddenItemSellingPriceCost_"+aryCount+"\"  id=\"fltHiddenItemSellingPriceCost_"+aryCount+"\" value=\""+fltHiddenItemSellingPriceCost+"\" />"+
    									 	"<input type=\"hidden\"  name=\"fltItemSellingPriceCost_"+aryCount+"\"  id=\"fltItemSellingPriceCost_"+aryCount+"\" value=\""+fltItemSellingPriceCost+"\" />"+
    									 	"<a href=\"#\" class=\"btn btn-tiny edit_inv_item editItem\" id=\"editItem_"+aryCount+"\" >Edit</a>" +
    									 	"<a href=\"#\" class=\"btn btn-tiny confirmDelete deleteItem\" id=\"deleteItem_"+aryCount+"\" >Delete</a>" +
    								 	"</td>" +
    								 "</tr>");
    								
    								 count = Number(count)+1;
    								 $("#intSlNo").val(count);
    								 $("#strItemCode").val("");
    								 $("#strItemName").val("");
    								 $("#intquantity").val("0");
    								 $("#fltDiscount").val("0.00");
    								 $("#fltUnitPrice").val("0.00");
    								 $("#fltItemSellingPrice").val("0.00");
    								 $("#fltItemSellingPriceCost").val("0.00");
    								 $("#fltHiddenItemSellingPrice").val("0.00");
    								 $("#fltHiddenItemSellingPriceCost").val("0.00");
    								 $("#fltNetAmount").val("0.00");
    								 $("#intSlNo").focus();
    								  $(".itemAdd").css("color","white");
    								 $("#intItemId").val("");
    					}
    				}	 
    			
    			if( error == 1)
    				return false;
    			else
    				return true;
    		});
    		
    		$(".editItem").live( "click", function() {
    			 $("#intSlNo").focus();	
    			var editSalesItem = $(this).attr('id');
    			var editSalesItemid = editSalesItem.split("_");
    			var aryCount = editSalesItemid[1];
    			
    			 $("#intSlNo").val(arySlNo[aryCount]);
    			 $("#strItemCode").val(aryItemId[aryCount]);
    			 $("#strItemName").val(aryItemId[aryCount]);
    			 $("#intItemId").val(aryItemId[aryCount]);
    			 $("#intquantity").val(aryQuantity[aryCount]);
    			 $("#fltDiscount").val(aryDiscount[aryCount]);
    			 $("#fltUnitPrice").val(aryUnitPrice[aryCount]);
    			 $("#fltItemSellingPrice").val(aryItemSellingPrice[aryCount]);
				 $("#fltItemSellingPriceCost").val(aryItemSellingPriceCost[aryCount]);
				 $("#fltHiddenItemSellingPrice").val(aryHiddenItemSellingPrice[aryCount]);
				 $("#fltHiddenItemSellingPriceCost").val(aryHiddenItemSellingPriceCost[aryCount]);
    			 $("#fltNetAmount").val(aryNetAmount[aryCount]);
    			 
    			
    			 $("#addItem").hide();
    			 $("#updateItem").show();
    			 
    		});
    		
    		$(".deleteItem").live( "click", function() {
    			if (confirm('Are you sure you want to delete the selected items?')){
    				
    				var deleteSalesItemid = jQuery.trim($(this).attr('id'));
    				var deleteSalesItem = deleteSalesItemid.split("_");
	    			var aryCount = deleteSalesItem[1];
	    			var qty = aryQuantity[aryCount];
	    			var fltItemAmount = jQuery.trim($("#fltItemAmount").val());
	    				fltItemAmount = Number(fltItemAmount) - aryNetAmount[aryCount]; 
    					for(i=aryCount ;i<aryItemId.length;i++){
    						 tr = $('#sp_'+i).html("");
    						tr.remove();
    						count = Number(i)+ 1;
    						if(count != aryItemId.length){
    							
    							aryItemId[i] = aryItemId[count] ;
    							aryItemCode[i] = aryItemCode[count];
    							aryItemName[i] = aryItemName[count];
    							aryQuantity[i] = aryQuantity[count];
    							aryDiscount[i] = aryDiscount[count];
								aryUnitPrice[i] = aryUnitPrice[count];
    							aryNetAmount[i] = aryNetAmount[count];
    							aryItemSellingPrice[i] =aryItemSellingPrice[count];
    							aryItemSellingPriceCost[i] = aryItemSellingPriceCost[count];
    							aryHiddenQuantity[i] = aryHiddenQuantity[count];
    							aryHiddenItemSellingPrice[i] = aryHiddenItemSellingPrice[count];
								aryHiddenItemSellingPriceCost[i] = aryHiddenItemSellingPriceCost[count];
    						
    							if((Number(i) + 2) == aryItemId.length){
    								tr = $('#sp_'+count).html("");
    								tr.remove();
    								arySlNo.pop();
    								aryItemId.pop();
    								aryItemCode.pop();
    								aryItemName.pop();
    								aryQuantity.pop();
    								aryDiscount.pop();
    								aryUnitPrice.pop();
    								aryNetAmount.pop();
    								aryItemSellingPrice.pop();
    								aryItemSellingPriceCost.pop();
    								aryHiddenItemSellingPrice.pop();
    								aryHiddenItemSellingPriceCost.pop();
    								//aryHiddenQuantity.pop();
    								break;
    							} 
    						}else{
    							arySlNo.pop();
								aryItemId.pop();
								aryItemCode.pop();
								aryItemName.pop();
								aryQuantity.pop();
								aryDiscount.pop();
								aryUnitPrice.pop();
								aryNetAmount.pop();
								aryItemSellingPrice.pop();
								aryItemSellingPriceCost.pop();
								aryHiddenItemSellingPrice.pop();
								aryHiddenItemSellingPriceCost.pop();
								//aryHiddenQuantity.pop();
    							break;
    						}
    					}
    				
    					
    					for(i=aryCount ;i<aryItemId.length;i++){
    						
    						$('#itemList > tbody:last').append("<tr id=\"sp_"+i+"\"  class=\"nodrag nodrop invoice-row-total\">" +
    							 "<td style=\"width: 50px;\" >"+arySlNo[i]+"</td>" +
    							 "<td>"+aryItemCode[i]+"</td>" +
    							 "<td>"+aryItemName[i]+"</td>" +
    							 "<td class=\"td-right\">"+aryQuantity[i]+"</td>" +
    							 "<td class=\"td-right\">"+aryItemSellingPrice[i]+"</td>" +
    							 "<td class=\"td-right\" >"+aryDiscount[i]+"</td>" +
								 "<td class=\"td-right\" >"+aryUnitPrice[i]+"</td>" +
								 "<td class=\"td-right\">"+aryNetAmount[i]+"</td>" + "<td class=\"td-center\">" +
    							 	"<input type=\"hidden\"  name=\"fltHiddenItemSellingPrice_"+i+"\"  id=\"fltHiddenItemSellingPrice_"+i+"\" value=\""+aryHiddenItemSellingPrice[i]+"\" />"+
								 	"<input type=\"hidden\"  name=\"fltHiddenItemSellingPriceCost_"+i+"\"  id=\"fltHiddenItemSellingPriceCost_"+i+"\" value=\""+aryHiddenItemSellingPriceCost[i]+"\" />"+
    							 	"<input type=\"hidden\"  name=\"fltItemSellingPriceCost_"+i+"\"  id=\"fltItemSellingPriceCost_"+i+"\" value=\""+aryItemSellingPriceCost[i]+"\" />"+
    							 	"<a href=\"#\" class=\"btn btn-tiny edit_inv_item editItem\" id=\"editItem_"+i+"\" >Edit</a>" +
    							 	"<a href=\"#\" class=\"btn btn-tiny confirmDelete deleteItem\" id=\"deleteItem_"+i+"\" >Delete</a>" +
    						 	"</td>" +
    						 "</tr>");
    					}
    					
							
    					fltNetAmount = 0.00;
    					salescalTotalAmount(fltNetAmount,fltItemAmount);
    					var intSlNo = Number(jQuery.trim($("#intSlNo").val())) - 1;
    					var intTotalItem = Number(jQuery.trim($("#intTotalItem").val())) - 1;
    					var intTotalItemQuantity = Number(jQuery.trim($("#intTotalItemQuantity").val())) - Number(qty);
    					$("#intSlNo").val(intSlNo);
    					$("#intTotalItem").val(intTotalItem);
    					$("#intTotalItemQuantity").val(intTotalItemQuantity);
    			}		
    		});
    		$("#updateItem").live( "click", function() {
    			var error = 0;
    			 $("#intSlNo").focus();		
    			
    				 var intItemId = jQuery.trim($("#strItemCode").val());
    				 var strItemCode = jQuery.trim($("#strItemCode").val());
    				 var strItemName = jQuery.trim($("#strItemName").val());
    				 var strItem = "";
    				 var outOfStock = "";
    				 if(strItemCode != "" && strItemName != ""){
    					 strItemCode = jQuery.trim($("#strItemCode option:selected").text());
    					 strItemName = jQuery.trim($("#strItemName option:selected").text());
    					
    				 }else{
    					 
    					 alert("Enter all field with correct values");
    					 $("#strItemCode").focus();
    						 
    					 error = 1;
    				 }
    				 var count = jQuery.trim($("#intSlNo").val());
    				 if(aryItemCode.length > 0){
    					 for(var i=0;i<aryItemCode.length;i++){
    						 if(strItemCode == aryItemCode[i] && aryItemCode[i] != aryItemCode[Number(count)-1] ){
    							alert("The item already exist");
    							 error = 1;
    							 break;
    						 } 
    					 }
    				 }
    				 if(error == 0){
    					
    					 var intquantity = jQuery.trim($("#intquantity").val());
    					 var fltDiscount = jQuery.trim($("#fltDiscount").val());
    					 var fltUnitPrice = jQuery.trim($("#fltUnitPrice").val());
    					 var fltItemSellingPrice = jQuery.trim($("#fltItemSellingPrice").val());
    					 var fltItemSellingPriceCost = $("#fltItemSellingPriceCost").val();
    					 var fltHiddenItemSellingPrice = $("#fltHiddenItemSellingPrice").val();
    					 var fltHiddenItemSellingPriceCost = $("#fltHiddenItemSellingPriceCost").val();
    					 var fltNetAmount = jQuery.trim($("#fltNetAmount").val());
    					 var fltItemAmount = jQuery.trim($("#fltItemAmount").val());
    					
    					 var aryCount = 0;
    					 
    					 if(!IsNumeric(intquantity) || Number(intquantity) <= 0){ 
    				 		alert("The quantity should be a valid integer greater than 0.");		
    				 		 $("#intquantity").focus();
    				 		 error = 1;
    				 	}else if(!IsNumeric(fltItemSellingPrice) || Number(fltItemSellingPrice) <= 0){ 
    				 		alert("The unit price should be a valid integer greater than 0.");		
    						 $("#fltItemSellingPrice").focus();
    						 error = 1;
    						
    					}else if(error == 0){
    						if (confirm('Are you sure you want to update the selected items?')){
    								aryCount = Number(count)-1;
    								callSalesUpdateTotalItem(aryCount);
    								
    								
    								arySlNo[aryCount] = count;
    								aryItemId[aryCount] = intItemId;
    								aryItemCode[aryCount] = strItemCode;
    								aryItemName[aryCount] = strItemName;
    								aryQuantity[aryCount] = intquantity;
    								aryDiscount[aryCount] = fltDiscount;
    								aryUnitPrice[aryCount] = fltUnitPrice;
    								aryNetAmount[aryCount] = fltNetAmount;
    								aryItemSellingPrice[aryCount] = fltItemSellingPrice;
    								aryItemSellingPriceCost[aryCount] = fltItemSellingPriceCost;
    								aryHiddenItemSellingPrice[aryCount] = fltHiddenItemSellingPrice;
    								aryHiddenItemSellingPriceCost[aryCount] = fltHiddenItemSellingPriceCost;
    								$('#sp_'+aryCount).html("<td style=\"width: 50px;\" >"+count+"</td>" +
    									 "<td>"+strItemCode+"</td>" +
    									 "<td>"+strItemName+"</td>" +
    									 "<td class=\"td-right\" id=\"intquantity_"+aryCount+"\" >"+intquantity+"</td>" +
    									 "<td class=\"td-right\" id=\"fltItemSellingPrice"+aryCount+"\" >"+fltItemSellingPrice+"</td>" +
    									 "<td class=\"td-right\" id=\"fltDiscount_"+aryCount+"\" >"+fltDiscount+"</td>" +
    									 "<td class=\"td-right\" id=\"fltUnitPrice_"+aryCount+"\" >"+fltUnitPrice+"</td>" +
    									 "<td class=\"td-right\" id=\"fltNetAmount_"+aryCount+"\" >"+fltNetAmount+"</td>" +
    	 									 "<td class=\"td-center\">" +
    									 	"<input type=\"hidden\"  name=\"fltHiddenItemSellingPrice_"+aryCount+"\"  id=\"fltHiddenItemSellingPrice_"+aryCount+"\" value=\""+fltHiddenItemSellingPrice+"\" />"+
    									 	"<input type=\"hidden\"  name=\"fltHiddenItemSellingPriceCost_"+aryCount+"\"  id=\"fltHiddenItemSellingPriceCost_"+aryCount+"\" value=\""+fltHiddenItemSellingPriceCost+"\" />"+
    									 	"<input type=\"hidden\"  name=\"fltItemSellingPriceCost_"+aryCount+"\"  id=\"fltItemSellingPriceCost_"+aryCount+"\" value=\""+fltItemSellingPriceCost+"\" />"+
    									 	"<a href=\"#\" class=\"btn btn-tiny edit_inv_item editItem\" id=\"editItem_"+aryCount+"\" >Edit</a>" +
    									 	"<a href=\"#\" class=\"btn btn-tiny confirmDelete deleteItem\" id=\"deleteItem_"+aryCount+"\" >Delete</a>" +
    								 	"</td>");
    								
    								 $("#intSlNo").val( Number(aryItemId.length) + 1);
    								 $("#strItemCode").val("");
    								 $("#strItemName").val("");
    								 $("#intquantity").val("0");
    								 $("#fltDiscount").val("0.00");
    								 $("#fltUnitPrice").val("0.00");
    								 $("#fltItemSellingPrice").val("0.00");
    								 $("#fltItemSellingPriceCost").val("0.00");
    								 $("#fltHiddenItemSellingPrice").val("0.00");
    								 $("#fltHiddenItemSellingPriceCost").val("0.00");
    								 $("#fltNetAmount").val("0.00");
    								 $("#intSlNo").focus();
    								 $("#updateItem").hide();
    								 $("#addItem").show();
    								 $(".itemAdd").css("color","white");
    								 $("#intItemId").val("");
    						}
    					}
    				}	 
    			
    			if( error == 1)
    				return false;
    			else
    				return true;
    		});
    		
    		$("#addPopSepareparts").live( "click", function() {
    			var strValue = jQuery.trim($(this).val());
    			var intTotalItem = jQuery.trim($("#intTotalItem").val()); 
    			var intTotalItemQuantity = jQuery.trim($("#intTotalItemQuantity").val()); 
    			var fltItemAmount= jQuery.trim($("#fltItemAmount").val());
    			var intJobCardId = jQuery.trim($("#intJobCardId").val());
    			var error = 0;

    			
    			
    			if(!scriptValidation()){
    				error =1;
    			}
    			
    			if(error == 0){
    				
    				if(aryItemId.length == 0 && error == 0){
    					alert("Enter at least one item");
    					error =1;
    				}
    				if(error == 0){
    					//alert(strContactName);
    					for(var i=0;i<aryItemName.length;i++){
    						aryItemCode[i] = decodeURIComponent(aryItemCode[i]);
    						aryItemName[i] = decodeURIComponent(aryItemName[i]);
    						aryQuantity[i] = decodeURIComponent(aryQuantity[i]);
    						aryDiscount[i] = decodeURIComponent(aryDiscount[i]);
    						aryUnitPrice[i] = decodeURIComponent(aryUnitPrice[i]);
    						aryItemSellingPrice[i] = decodeURIComponent(aryItemSellingPrice[i]);
    						aryNetAmount[i] = decodeURIComponent(aryNetAmount[i]);
    						aryItemId[i] = decodeURIComponent(aryItemId[i]);
    						
    						aryItemCode[i] = encodeURIComponent(aryItemCode[i]);
    						aryItemName[i] = encodeURIComponent(aryItemName[i]);
    						aryQuantity[i] = encodeURIComponent(aryQuantity[i]);
    						aryDiscount[i] = encodeURIComponent(aryDiscount[i]);
    						aryUnitPrice[i] = encodeURIComponent(aryUnitPrice[i]);
    						aryItemSellingPrice[i] = encodeURIComponent(aryItemSellingPrice[i]);
    						aryNetAmount[i] = encodeURIComponent(aryNetAmount[i]);
    						aryItemId[i] = encodeURIComponent(aryItemId[i]);
    						
    					}
    					
    					
    				
    				
    					//$("#addPopSepareparts").attr('disabled','disabled');
    					tabModule = "Add Pop Separeparts"; 
    					arrSearch = new Array(0);
    					arrSearch[0] = new Array(0);
    					arrSearch[0][0] = 'aryItemCode';
    					arrSearch[0][1] =  aryItemCode;
    					arrSearch[1] = new Array(0);
    					arrSearch[1][0] = 'aryItemName';
    					arrSearch[1][1] =  aryItemName;
    					arrSearch[2] = new Array(0);
    					arrSearch[2][0] = 'aryQuantity';
    					arrSearch[2][1] =  aryQuantity;
    					arrSearch[3] = new Array(0);
    					arrSearch[3][0] = 'aryItemSellingPrice';
    					arrSearch[3][1] =  aryItemSellingPrice;
    					arrSearch[4] = new Array(0);
    					arrSearch[4][0] = 'aryItemSellingPriceCost';
    					arrSearch[4][1] =  aryItemSellingPriceCost;
    					arrSearch[5] = new Array(0);
    					arrSearch[5][0] = 'aryNetAmount';
    					arrSearch[5][1] =  aryNetAmount;
    					arrSearch[6] = new Array(0);
    					arrSearch[6][0] = 'aryItemId';
    					arrSearch[6][1] =  aryItemId;
    					arrSearch[7] = new Array(0);
    					arrSearch[7][0] = 'aryDiscount';
    					arrSearch[7][1] =  aryDiscount;
    					arrSearch[8] = new Array(0);
    					arrSearch[8][0] = 'aryUnitPrice';
    					arrSearch[8][1] =  aryUnitPrice;
    					arrSearch[9] = new Array(0);
    					arrSearch[9][0] = 'intJobCardId';
    					arrSearch[9][1] =  intJobCardId;
    					arrSearch[10] = new Array(0);
    					arrSearch[10][0] = 'event';
    					arrSearch[10][1] = 'addPopSepareparts';
    					
    					initiateAjaxRequest(arrSearch,gAdminPath+"/spareparts_jc/add_spareparts_jc.php");
    					
    				}	
    			}
    			if( error == 1)
    				return false;
    			else
    				return true;
    		});
    		$("#updatePopSepareparts").live( "click", function() {
    			var strValue = jQuery.trim($(this).val());
    			var intTotalItem = jQuery.trim($("#intTotalItem").val()); 
    			var intTotalItemQuantity = jQuery.trim($("#intTotalItemQuantity").val()); 
    			var fltItemAmount= jQuery.trim($("#fltItemAmount").val());
    			var intToGroupId = jQuery.trim($("#intToGroupId").val());
    			var intJobCardId = jQuery.trim($("#intJobCardId").val());
    			var error = 0;

    			
    			
    			if(!scriptValidation()){
    				error =1;
    			}
    			if(error == 0){
    				
    				/*if(aryItemId.length == 0 && error == 0){
    					alert("Enter at least one item");
    					error =1;
    				}*/
    				if(error == 0){
    					//alert(strContactName);
    					for(var i=0;i<aryItemName.length;i++){
    						aryItemCode[i] = decodeURIComponent(aryItemCode[i]);
    						aryItemName[i] = decodeURIComponent(aryItemName[i]);
    						aryQuantity[i] = decodeURIComponent(aryQuantity[i]);
    						aryItemSellingPrice[i] = decodeURIComponent(aryItemSellingPrice[i]);
    						aryDiscount[i] = decodeURIComponent(aryDiscount[i]);
    						aryUnitPrice[i] = decodeURIComponent(aryUnitPrice[i]);
    						aryNetAmount[i] = decodeURIComponent(aryNetAmount[i]);
    						aryItemId[i] = decodeURIComponent(aryItemId[i]);
    						
    						aryItemCode[i] = encodeURIComponent(aryItemCode[i]);
    						aryItemName[i] = encodeURIComponent(aryItemName[i]);
    						aryQuantity[i] = encodeURIComponent(aryQuantity[i]);
    						aryItemSellingPrice[i] = encodeURIComponent(aryItemSellingPrice[i]);
    						aryDiscount[i] = encodeURIComponent(aryDiscount[i]);
    						aryUnitPrice[i] = encodeURIComponent(aryUnitPrice[i]);
    						aryNetAmount[i] = encodeURIComponent(aryNetAmount[i]);
    						aryItemId[i] = encodeURIComponent(aryItemId[i]);
    					}
    					
    					//$("#addPopSepareparts").attr('disabled','disabled');
    					tabModule = "Update Pop Separeparts"; 
    					arrSearch = new Array(0);
    					arrSearch[0] = new Array(0);
    					arrSearch[0][0] = 'aryItemCode';
    					arrSearch[0][1] =  aryItemCode;
    					arrSearch[1] = new Array(0);
    					arrSearch[1][0] = 'aryItemName';
    					arrSearch[1][1] =  aryItemName;
    					arrSearch[2] = new Array(0);
    					arrSearch[2][0] = 'aryQuantity';
    					arrSearch[2][1] =  aryQuantity;
    					arrSearch[3] = new Array(0);
    					arrSearch[3][0] = 'aryItemSellingPrice';
    					arrSearch[3][1] =  aryItemSellingPrice;
    					arrSearch[4] = new Array(0);
    					arrSearch[4][0] = 'aryItemSellingPriceCost';
    					arrSearch[4][1] =  aryItemSellingPriceCost;
    					arrSearch[5] = new Array(0);
    					arrSearch[5][0] = 'aryNetAmount';
    					arrSearch[5][1] =  aryNetAmount;
    					arrSearch[6] = new Array(0);
    					arrSearch[6][0] = 'aryItemId';
    					arrSearch[6][1] =  aryItemId;
    					arrSearch[7] = new Array(0);
    					arrSearch[7][0] = 'intToGroupId';
    					arrSearch[7][1] =  intToGroupId;
    					arrSearch[8] = new Array(0);
    					arrSearch[8][0] = 'intsparepartCount';
    					arrSearch[8][1] =  aryItemId.length;
    					arrSearch[9] = new Array(0);
    					arrSearch[9][0] = 'aryDiscount';
    					arrSearch[9][1] =  aryDiscount;
    					arrSearch[10] = new Array(0);
    					arrSearch[10][0] = 'aryUnitPrice';
    					arrSearch[10][1] =  aryUnitPrice;
    					arrSearch[11] = new Array(0);
    					arrSearch[11][0] = 'intJobCardId';
    					arrSearch[11][1] =  intJobCardId;
    					arrSearch[12] = new Array(0);
    					arrSearch[12][0] = 'event';
    					arrSearch[12][1] = 'updatePopSepareparts';
    					
    					initiateAjaxRequest(arrSearch,gAdminPath+"/spareparts_jc/edit_spareparts_jc.php");
    					
    				}	
    			}
    			if( error == 1)
    				return false;
    			else
    				return true;
    		});
    		
    }

};

function callSalesSingleItem(){
	var intquantity = jQuery.trim($("#intquantity").val());
	var fltItemSellingPrice = jQuery.trim($("#fltItemSellingPrice").val());
	var fltDiscount  = jQuery.trim($("#fltDiscount").val());
	var fltNetAmount = 0.00;
	 
	if(!IsNumeric(intquantity)){ 
		alert("Only Numbers are allowed");
		$("#intquantity").val("0");
		$("#intquantity").focus();
		return false;
	}else if(!IsNumeric(fltItemSellingPrice)){ 
		alert("Only Numbers are allowed");
		$("#fltItemSellingPrice").val("");
		$("#fltItemSellingPrice").focus();
		return false;
	}
	
	if(intquantity != "" && fltItemSellingPrice != ""){
		fltDiscount = Number(fltDiscount).toFixed(2);
		fltItemSellingPrice = Number(fltItemSellingPrice).toFixed(2);
		fltDiscountFCs = Number(fltItemSellingPrice) * (Number(fltDiscount)/100);
		fltUnitPrice = Number(fltItemSellingPrice) - Number(fltDiscountFCs);
		fltUnitPrice = Number(fltUnitPrice).toFixed(2);
		
		fltNetAmount = Number(intquantity) * Number(fltUnitPrice);
		
		
		$("#fltDiscount").val(fltDiscount);
		$("#fltItemSellingPrice").val(fltItemSellingPrice);
		$("#fltUnitPrice").val(fltUnitPrice);
		fltNetAmount = Number(fltNetAmount).toFixed(2);
		$("#fltNetAmount").val(fltNetAmount);
	
	}

}
function salescalTotalAmount(fltNetAmount,fltItemAmount){

	if(Number(fltNetAmount) > 0)
		fltItemAmount = Number(fltItemAmount) + Number(fltNetAmount); 

	fltItemAmount = Number(fltItemAmount).toFixed(2);
	$("#fltItemAmount").val(fltItemAmount);



}
function callSalesUpdateTotalItem(aryCount){

	var fltNetAmount = jQuery.trim($("#fltNetAmount").val());
	var fltItemAmount = jQuery.trim($("#fltItemAmount").val());
	var intSlNo = jQuery.trim($("#intSlNo").val());
	var intquantity = jQuery.trim($("#intquantity").val());
	var intTotalItemQuantity = jQuery.trim($("#intTotalItemQuantity").val());
	
	
	fltItemAmount = Number(fltItemAmount) - Number(aryNetAmount[aryCount]);
	fltItemAmount = Number(fltItemAmount) +  Number(fltNetAmount);
	
	intTotalItemQuantity =  Number(intTotalItemQuantity) -  Number(aryQuantity[aryCount]);
	intTotalItemQuantity = Number(intTotalItemQuantity) + Number(intquantity);
	
	
	
	fltItemAmount = Number(fltItemAmount).toFixed(2);
	
	
	$("#intTotalItemQuantity").val(intTotalItemQuantity);
	$("#fltItemAmount").val(fltItemAmount);
	

}
function clearAryValue(){
	aryItemId = [] ;
	aryItemCode = [] ;
	aryItemName = [] ;
	aryQuantity = [] ;
	aryDiscount = [] ;
	aryUnitPrice = [] ;
	aryNetAmount = [] ;
	aryItemSellingPrice = [] ;
	aryItemSellingPriceCost = [] ;
	aryHiddenQuantity = [] ;
	aryHiddenItemSellingPrice = [] ;
	aryHiddenItemSellingPriceCost = [] ;
	arySlNo = [];
	aryCount = [];
	aryFileAttachment = [];
	arySystemName = [];
	aryFileName = [];
	
	aryItemId.length = 0;
	aryItemCode.length = 0;
	aryItemName.length = 0;
	aryQuantity.length = 0;
	aryDiscount.length = 0;
	aryUnitPrice.length = 0;
	aryNetAmount.length = 0;
	aryItemSellingPrice.length = 0;
	aryItemSellingPriceCost.length = 0;
	aryHiddenQuantity.length = 0;
	aryHiddenItemSellingPrice.length = 0;
	aryHiddenItemSellingPriceCost.length = 0;
	arySlNo.length = 0;
	aryCount.length = 0;
	aryFileAttachment.length = 0;
	arySystemName.length = 0;
	aryFileName.length = 0;
}


var owl = {
	    init: function () {
	    	
	    	$(".nyroModalBg,  .nyroModalClose").live('click',function(e){ 
	    		clearAryValue();
				clearOwlAryValue();
    			
	    	});
	    	
	    	$(".owlDetail").live( "click", function() {
	    		
	    		var intOwl = jQuery.trim($(this).val());
	    		if(jQuery.trim(intOwl) != ""){
	    			intOwlId = intOwl;
	    			$("#intOwlId").val(intOwlId);
	    			tabModule = "Owl Detail"; 
	    			arrSearch = new Array(0);
	    			arrSearch[0] = new Array(0);
	    			arrSearch[0][0] = 'intOwlId';
	    			arrSearch[0][1] =  intOwlId;
	    			arrSearch[1] = new Array(0);
	    			arrSearch[1][0] = 'event';
	    			arrSearch[1][1] = 'getOwlDetail';
	    			initiateAjaxRequest(arrSearch,gAdminPath+"/owl_work_jc/add_owl_work_jc.php");
	    		}else if(jQuery.trim(intOwl) == ""){
	    			$("#strOwlCode").val("");
	    			$("#strOwlName").val("");
	    			$("#fltOwlSellingPrice").val("0.00");
	    			$("#intOwlquantity").val("0");
	    			$("#fltOwlSellingPriceCost").val("0.00");
	    			$("#fltOwlNetAmount").val("0.00");
	    			$("#intOwlId").val("");
	    		}
	    	});
	    	
	  
	    	$(".callSalesSingleOwl").live( "change", function() {
	    		callSalesSingleOwl();
	    		
	    	});
	    	
	    	
	    	$("#addOwl").live( "click", function() {
	    		var error = 0;
    			 $("#intOwlSlNo").focus();		
    			
    				 var intOwlId = jQuery.trim($("#strOwlCode").val());
    				 var strOwlCode = jQuery.trim($("#strOwlCode").val());
    				 var strOwlName = jQuery.trim($("#strOwlName").val());
    				 var intJobCardId = jQuery.trim($("#intJobCardId").val());
    				 var strOwl = "";
    				 var outOfStock = "";
    				 if(strOwlCode != "" && strOwlName != ""){
    					 strOwlCode = jQuery.trim($("#strOwlCode option:selected").text());
    					 strOwlName = jQuery.trim($("#strOwlName option:selected").text());
    					
    				 }else{
    					 
    					 alert("Enter all field with correct values");
    					 $("#strOwlCode").focus();
    						 
    					 error = 1;
    				 }
    				 if(aryOwlCode.length > 0){
    					 for(var i=0;i<aryOwlCode.length;i++){
    						 if(strOwlCode == aryOwlCode[i]){
    							alert("The item already exist");
    							 error = 1;
    							 break;
    						 } 
    					 }
    				 }
    				 if(error == 0){
    					
    					 var intOwlquantity = jQuery.trim($("#intOwlquantity").val());
    					 
    					 var fltOwlSellingPrice = jQuery.trim($("#fltOwlSellingPrice").val());
    					 var fltOwlSellingPriceCost = $("#fltOwlSellingPriceCost").val();
    					 var fltOwlHiddenSellingPrice = $("#fltOwlHiddenSellingPrice").val();
    					 var fltOwlHiddenSellingPriceCost = $("#fltOwlHiddenSellingPriceCost").val();
    					 var fltOwlDiscount = jQuery.trim($("#fltOwlDiscount").val());
    					 var fltOwlUnitPrice = jQuery.trim($("#fltOwlUnitPrice").val());
    					 var fltOwlNetAmount = jQuery.trim($("#fltOwlNetAmount").val());
    					 var fltOwlAmount = jQuery.trim($("#fltOwlAmount").val());
    					 var count = jQuery.trim($("#intOwlSlNo").val());
    					 var aryOwlCount = 0;
    					
    					 if(!IsNumeric(intOwlquantity) || Number(intOwlquantity) <= 0){ 
    				 		alert("The quantity should be a valid integer greater than 0.");		
    				 		 $("#intOwlquantity").focus();
    				 		 error = 1;
    				 	}else if(!IsNumeric(fltOwlSellingPrice) || Number(fltOwlSellingPrice) <= 0){ 
    				 		alert("The unit price should be a valid integer greater than 0.");		
    						 $("#fltOwlSellingPrice").focus();
    						 error = 1; 
    					}else if(error == 0){
    								salescalTotalAmountOwl(fltOwlNetAmount,fltOwlAmount);
    								
    								
    								var intOwlTotalQuantity = jQuery.trim($("#intOwlTotalQuantity").val());
    								intOwlTotalQuantity = Number(intOwlTotalQuantity) + Number(intOwlquantity);
    								$("#intOwlTotal").val(jQuery.trim($("#intOwlSlNo").val()));
    								$("#intOwlTotalQuantity").val(intOwlTotalQuantity);
    								aryOwlCount = Number(count)-1;
    								aryOwlSlNo[aryOwlCount] = count;
    								aryOwlId[aryOwlCount] = intOwlId;
    								aryOwlCode[aryOwlCount] = strOwlCode;
    								aryOwlName[aryOwlCount] = strOwlName;
    								aryOwlQuantity[aryOwlCount] = intOwlquantity;
    								aryOwlDiscount[aryOwlCount] = fltOwlDiscount;
    								aryOwlUnitPrice[aryOwlCount] = fltOwlUnitPrice;
    								aryOwlNetAmount[aryOwlCount] = fltOwlNetAmount;
    								aryOwlSellingPrice[aryOwlCount] =fltOwlSellingPrice;
    								aryOwlSellingPriceCost[aryOwlCount] = fltOwlSellingPriceCost;
    								aryOwlHiddenSellingPrice[aryOwlCount] = fltOwlHiddenSellingPrice;
    								aryOwlHiddenSellingPriceCost[aryOwlCount] = fltOwlHiddenSellingPriceCost;
    								 $('#owlList > tbody:last').append("<tr id=\"ol_"+aryOwlCount+"\"  class=\"nodrag nodrop invoice-row-total\">" +
    									 "<td style=\"width: 50px;\" >"+count+"</td>" +
    									 "<td>"+strOwlCode+"</td>" +
    									 "<td>"+strOwlName+"</td>" +
    									 "<td class=\"td-right\" id=\"intOwlquantity_"+aryOwlCount+"\" >"+intOwlquantity+"</td>" +
    									 "<td class=\"td-right\" id=\"fltOwlSellingPrice_"+aryOwlCount+"\" >"+fltOwlSellingPrice+"</td>" +
    									 "<td class=\"td-right\" id=\"fltOwlDiscount_"+aryOwlCount+"\" >"+fltOwlDiscount+"</td>" +
    									 "<td class=\"td-right\" id=\"fltOwlUnitPrice_"+aryOwlCount+"\" >"+fltOwlUnitPrice+"</td>" +
    									"<td class=\"td-right\" id=\"fltOwlNetAmount_"+aryOwlCount+"\" >"+fltOwlNetAmount+"</td>" +
    	 									 "<td class=\"td-center\">" +
    									 	"<input type=\"hidden\"  name=\"fltOwlHiddenSellingPrice_"+aryOwlCount+"\"  id=\"fltOwlHiddenSellingPrice_"+aryOwlCount+"\" value=\""+fltOwlHiddenSellingPrice+"\" />"+
    									 	"<input type=\"hidden\"  name=\"fltOwlHiddenSellingPriceCost_"+aryOwlCount+"\"  id=\"fltOwlHiddenSellingPriceCost_"+aryOwlCount+"\" value=\""+fltOwlHiddenSellingPriceCost+"\" />"+
    									 	"<input type=\"hidden\"  name=\"fltOwlSellingPriceCost_"+aryOwlCount+"\"  id=\"fltOwlSellingPriceCost_"+aryOwlCount+"\" value=\""+fltOwlSellingPriceCost+"\" />"+
    									 	"<a href=\"#\" class=\"btn btn-tiny edit_inv_item editOwl\" id=\"editOwl_"+aryOwlCount+"\" >Edit</a>" +
    									 	"<a href=\"#\" class=\"btn btn-tiny confirmDelete deleteOwl\" id=\"deleteOwl_"+aryOwlCount+"\" >Delete</a>" +
    								 	"</td>" +
    								 "</tr>");
    								
    								 count = Number(count)+1;
    								 $("#intOwlSlNo").val(count);
    								 $("#strOwlCode").val("");
    								 $("#strOwlName").val("");
    								 $("#intOwlquantity").val("0");
    								 $("#fltOwlDiscount").val("0.00");
    								 $("#fltOwlUnitPrice").val("0.00");
    								 $("#fltOwlSellingPrice").val("0.00");
    								 $("#fltOwlSellingPriceCost").val("0.00");
    								 $("#fltOwlHiddenSellingPrice").val("0.00");
    								 $("#fltOwlHiddenSellingPriceCost").val("0.00");
    								 $("#fltOwlNetAmount").val("0.00");
    								 $("#intOwlSlNo").focus();
    								  $(".itemAdd").css("color","white");
    								 $("#intOwlId").val("");
    					}
    				}	 
    			
    			if( error == 1)
    				return false;
    			else
    				return true;
    		});
    		
    		$(".editOwl").live( "click", function() {
    			 $("#intOwlSlNo").focus();	
    			var editSalesOwl = $(this).attr('id');
    			var editSalesOwlid = editSalesOwl.split("_");
    			var aryOwlCount = editSalesOwlid[1];
    			
    			 $("#intOwlSlNo").val(aryOwlSlNo[aryOwlCount]);
    			 $("#strOwlCode").val(aryOwlId[aryOwlCount]);
    			 $("#strOwlName").val(aryOwlId[aryOwlCount]);
    			 $("#intOwlId").val(aryOwlId[aryOwlCount]);
    			 $("#intOwlquantity").val(aryOwlQuantity[aryOwlCount]);
    			 $("#fltOwlDiscount").val(aryOwlDiscount[aryOwlCount]);
    			 $("#fltOwlUnitPrice").val(aryOwlUnitPrice[aryOwlCount]);
    			 $("#fltOwlSellingPrice").val(aryOwlSellingPrice[aryOwlCount]);
				 $("#fltOwlSellingPriceCost").val(aryOwlSellingPriceCost[aryOwlCount]);
				 $("#fltOwlHiddenSellingPrice").val(aryOwlHiddenSellingPrice[aryOwlCount]);
				 $("#fltOwlHiddenSellingPriceCost").val(aryOwlHiddenSellingPriceCost[aryOwlCount]);
    			 $("#fltOwlNetAmount").val(aryOwlNetAmount[aryOwlCount]);
    			 
    			
    			 $("#addOwl").hide();
    			 $("#updateOwl").show();
    			 
    		});
    		
    		$(".deleteOwl").live( "click", function() {
    			if (confirm('Are you sure you want to delete the selected items?')){
    				
    				var deleteSalesOwlid = jQuery.trim($(this).attr('id'));
    				var deleteSalesOwl = deleteSalesOwlid.split("_");
	    			var aryOwlCount = deleteSalesOwl[1];
	    			var qty = aryOwlQuantity[aryOwlCount];
	    			var fltOwlAmount = jQuery.trim($("#fltOwlAmount").val());
	    				fltOwlAmount = Number(fltOwlAmount) - aryOwlNetAmount[aryOwlCount]; 
    					for(i=aryOwlCount ;i<aryOwlId.length;i++){
    						 tr = $('#ol_'+i).html("");
    						tr.remove();
    						count = Number(i)+ 1;
    						if(count != aryOwlId.length){
    							
    							aryOwlId[i] = aryOwlId[count] ;
    							aryOwlCode[i] = aryOwlCode[count];
    							aryOwlName[i] = aryOwlName[count];
    							aryOwlQuantity[i] = aryOwlQuantity[count];
    							aryOwlDiscount[i] = aryOwlDiscount[count];
								aryOwlUnitPrice[i] = aryOwlUnitPrice[count];
    							aryOwlNetAmount[i] = aryOwlNetAmount[count];
    							aryOwlSellingPrice[i] =aryOwlSellingPrice[count];
    							aryOwlSellingPriceCost[i] = aryOwlSellingPriceCost[count];
    							aryOwlHiddenQuantity[i] = aryOwlHiddenQuantity[count];
    							aryOwlHiddenSellingPrice[i] = aryOwlHiddenSellingPrice[count];
								aryOwlHiddenSellingPriceCost[i] = aryOwlHiddenSellingPriceCost[count];
    						
    							if((Number(i) + 2) == aryOwlId.length){
    								tr = $('#ol_'+count).html("");
    								tr.remove();
    								aryOwlSlNo.pop();
    								aryOwlId.pop();
    								aryOwlCode.pop();
    								aryOwlName.pop();
    								aryOwlQuantity.pop();
    								aryOwlDiscount.pop();
    								aryOwlUnitPrice.pop();
    								aryOwlNetAmount.pop();
    								aryOwlSellingPrice.pop();
    								aryOwlSellingPriceCost.pop();
    								aryOwlHiddenSellingPrice.pop();
    								aryOwlHiddenSellingPriceCost.pop();
    								//aryOwlHiddenQuantity.pop();
    								break;
    							} 
    						}else{
    							aryOwlSlNo.pop();
								aryOwlId.pop();
								aryOwlCode.pop();
								aryOwlName.pop();
								aryOwlQuantity.pop();
								aryOwlDiscount.pop();
								aryOwlUnitPrice.pop();
								aryOwlNetAmount.pop();
								aryOwlSellingPrice.pop();
								aryOwlSellingPriceCost.pop();
								aryOwlHiddenSellingPrice.pop();
								aryOwlHiddenSellingPriceCost.pop();
								//aryOwlHiddenQuantity.pop();
    							break;
    						}
    					}
    				
    					
    					for(i=aryOwlCount ;i<aryOwlId.length;i++){
    						
    						$('#owlList > tbody:last').append("<tr id=\"ol_"+i+"\"  class=\"nodrag nodrop invoice-row-total\">" +
    							 "<td style=\"width: 50px;\" >"+aryOwlSlNo[i]+"</td>" +
    							 "<td>"+aryOwlCode[i]+"</td>" +
    							 "<td>"+aryOwlName[i]+"</td>" +
    							 "<td class=\"td-right\">"+aryOwlQuantity[i]+"</td>" +
    							 "<td class=\"td-right\">"+aryOwlSellingPrice[i]+"</td>" +
    							 "<td class=\"td-right\" >"+aryOwlDiscount[i]+"</td>" +
								 "<td class=\"td-right\" >"+aryOwlUnitPrice[i]+"</td>" +
								 "<td class=\"td-right\">"+aryOwlNetAmount[i]+"</td>" + "<td class=\"td-center\">" +
    							 	"<input type=\"hidden\"  name=\"fltOwlHiddenSellingPrice_"+i+"\"  id=\"fltOwlHiddenSellingPrice_"+i+"\" value=\""+aryOwlHiddenSellingPrice[i]+"\" />"+
								 	"<input type=\"hidden\"  name=\"fltOwlHiddenSellingPriceCost_"+i+"\"  id=\"fltOwlHiddenSellingPriceCost_"+i+"\" value=\""+aryOwlHiddenSellingPriceCost[i]+"\" />"+
    							 	"<input type=\"hidden\"  name=\"fltOwlSellingPriceCost_"+i+"\"  id=\"fltOwlSellingPriceCost_"+i+"\" value=\""+aryOwlSellingPriceCost[i]+"\" />"+
    							 	"<a href=\"#\" class=\"btn btn-tiny edit_inv_item editOwl\" id=\"editOwl_"+i+"\" >Edit</a>" +
    							 	"<a href=\"#\" class=\"btn btn-tiny confirmDelete deleteOwl\" id=\"deleteOwl_"+i+"\" >Delete</a>" +
    						 	"</td>" +
    						 "</tr>");
    					}
    					
							
    					fltOwlNetAmount = 0.00;
    					salescalTotalAmountOwl(fltOwlNetAmount,fltOwlAmount);
    					var intOwlSlNo = Number(jQuery.trim($("#intOwlSlNo").val())) - 1;
    					var intOwlTotal = Number(jQuery.trim($("#intOwlTotal").val())) - 1;
    					var intOwlTotalQuantity = Number(jQuery.trim($("#intOwlTotalQuantity").val())) - Number(qty);
    					$("#intOwlSlNo").val(intOwlSlNo);
    					$("#intOwlTotal").val(intOwlTotal);
    					$("#intOwlTotalQuantity").val(intOwlTotalQuantity);
    			}		
    		});
    		$("#updateOwl").live( "click", function() {
    			var error = 0;
    			 $("#intOwlSlNo").focus();		
    			 	 var intJobCardId = jQuery.trim($("#intJobCardId").val());
    				 var intOwlId = jQuery.trim($("#strOwlCode").val());
    				 var strOwlCode = jQuery.trim($("#strOwlCode").val());
    				 var strOwlName = jQuery.trim($("#strOwlName").val());
    				 var strOwl = "";
    				 var outOfStock = "";
    				 if(strOwlCode != "" && strOwlName != ""){
    					 strOwlCode = jQuery.trim($("#strOwlCode option:selected").text());
    					 strOwlName = jQuery.trim($("#strOwlName option:selected").text());
    					
    				 }else{
    					 
    					 alert("Enter all field with correct values");
    					 $("#strOwlCode").focus();
    						 
    					 error = 1;
    				 }
    				 var count = jQuery.trim($("#intOwlSlNo").val());
    				 if(aryOwlCode.length > 0){
    					 for(var i=0;i<aryOwlCode.length;i++){
    						 if(strOwlCode == aryOwlCode[i] && aryOwlCode[i] != aryOwlCode[Number(count)-1] ){
    							alert("The item already exist");
    							 error = 1;
    							 break;
    						 } 
    					 }
    				 }
    				 if(error == 0){
    					
    					 var intOwlquantity = jQuery.trim($("#intOwlquantity").val());
    					 var fltOwlDiscount = jQuery.trim($("#fltOwlDiscount").val());
    					 var fltOwlUnitPrice = jQuery.trim($("#fltOwlUnitPrice").val());
    					 var fltOwlSellingPrice = jQuery.trim($("#fltOwlSellingPrice").val());
    					 var fltOwlSellingPriceCost = $("#fltOwlSellingPriceCost").val();
    					 var fltOwlHiddenSellingPrice = $("#fltOwlHiddenSellingPrice").val();
    					 var fltOwlHiddenSellingPriceCost = $("#fltOwlHiddenSellingPriceCost").val();
    					 var fltOwlNetAmount = jQuery.trim($("#fltOwlNetAmount").val());
    					 var fltOwlAmount = jQuery.trim($("#fltOwlAmount").val());
    					
    					 var aryOwlCount = 0;
    					 
    					 if(!IsNumeric(intOwlquantity) || Number(intOwlquantity) <= 0){ 
    				 		alert("The quantity should be a valid intOwleger greater than 0.");		
    				 		 $("#intOwlquantity").focus();
    				 		 error = 1;
    				 	}else if(!IsNumeric(fltOwlSellingPrice) || Number(fltOwlSellingPrice) <= 0){ 
    				 		alert("The unit price should be a valid intOwleger greater than 0.");		
    						 $("#fltOwlSellingPrice").focus();
    						 error = 1;
    						
    					}else if(error == 0){
    						if (confirm('Are you sure you want to update the selected items?')){
    								aryOwlCount = Number(count)-1;
    								callSalesUpdateTotalOwl(aryOwlCount);
    								
    								
    								aryOwlSlNo[aryOwlCount] = count;
    								aryOwlId[aryOwlCount] = intOwlId;
    								aryOwlCode[aryOwlCount] = strOwlCode;
    								aryOwlName[aryOwlCount] = strOwlName;
    								aryOwlQuantity[aryOwlCount] = intOwlquantity;
    								aryOwlDiscount[aryOwlCount] = fltOwlDiscount;
    								aryOwlUnitPrice[aryOwlCount] = fltOwlUnitPrice;
    								aryOwlNetAmount[aryOwlCount] = fltOwlNetAmount;
    								aryOwlSellingPrice[aryOwlCount] = fltOwlSellingPrice;
    								aryOwlSellingPriceCost[aryOwlCount] = fltOwlSellingPriceCost;
    								aryOwlHiddenSellingPrice[aryOwlCount] = fltOwlHiddenSellingPrice;
    								aryOwlHiddenSellingPriceCost[aryOwlCount] = fltOwlHiddenSellingPriceCost;
    								$('#ol_'+aryOwlCount).html("<td style=\"width: 50px;\" >"+count+"</td>" +
    									 "<td>"+strOwlCode+"</td>" +
    									 "<td>"+strOwlName+"</td>" +
    									 "<td class=\"td-right\" id=\"intOwlquantity_"+aryOwlCount+"\" >"+intOwlquantity+"</td>" +
    									 "<td class=\"td-right\" id=\"fltOwlSellingPrice"+aryOwlCount+"\" >"+fltOwlSellingPrice+"</td>" +
    									 "<td class=\"td-right\" id=\"fltOwlDiscount_"+aryOwlCount+"\" >"+fltOwlDiscount+"</td>" +
    									 "<td class=\"td-right\" id=\"fltOwlUnitPrice_"+aryOwlCount+"\" >"+fltOwlUnitPrice+"</td>" +
    									 "<td class=\"td-right\" id=\"fltOwlNetAmount_"+aryOwlCount+"\" >"+fltOwlNetAmount+"</td>" +
    	 									 "<td class=\"td-center\">" +
    									 	"<input type=\"hidden\"  name=\"fltOwlHiddenSellingPrice_"+aryOwlCount+"\"  id=\"fltOwlHiddenSellingPrice_"+aryOwlCount+"\" value=\""+fltOwlHiddenSellingPrice+"\" />"+
    									 	"<input type=\"hidden\"  name=\"fltOwlHiddenSellingPriceCost_"+aryOwlCount+"\"  id=\"fltOwlHiddenSellingPriceCost_"+aryOwlCount+"\" value=\""+fltOwlHiddenSellingPriceCost+"\" />"+
    									 	"<input type=\"hidden\"  name=\"fltOwlSellingPriceCost_"+aryOwlCount+"\"  id=\"fltOwlSellingPriceCost_"+aryOwlCount+"\" value=\""+fltOwlSellingPriceCost+"\" />"+
    									 	"<a href=\"#\" class=\"btn btn-tiny edit_inv_item editOwl\" id=\"editOwl_"+aryOwlCount+"\" >Edit</a>" +
    									 	"<a href=\"#\" class=\"btn btn-tiny confirmDelete deleteOwl\" id=\"deleteOwl_"+aryOwlCount+"\" >Delete</a>" +
    								 	"</td>");
    								
    								 $("#intOwlSlNo").val( Number(aryOwlId.length) + 1);
    								 $("#strOwlCode").val("");
    								 $("#strOwlName").val("");
    								 $("#intOwlquantity").val("0");
    								 $("#fltOwlDiscount").val("0.00");
    								 $("#fltOwlUnitPrice").val("0.00");
    								 $("#fltOwlSellingPrice").val("0.00");
    								 $("#fltOwlSellingPriceCost").val("0.00");
    								 $("#fltOwlHiddenSellingPrice").val("0.00");
    								 $("#fltOwlHiddenSellingPriceCost").val("0.00");
    								 $("#fltOwlNetAmount").val("0.00");
    								 $("#intOwlSlNo").focus();
    								 $("#updateOwl").hide();
    								 $("#addOwl").show();
    								 $(".itemAdd").css("color","white");
    								 $("#intOwlId").val("");
    						}
    					}
    				}	 
    			
    			if( error == 1)
    				return false;
    			else
    				return true;
    		});
    		
    		$("#addPopOwl").live( "click", function() {
    			var strValue = jQuery.trim($(this).val());
    			var intOwlTotal = jQuery.trim($("#intOwlTotal").val()); 
    			var intOwlTotalQuantity = jQuery.trim($("#intOwlTotalQuantity").val()); 
    			var fltOwlAmount= jQuery.trim($("#fltOwlAmount").val());
    			var intJobCardId = jQuery.trim($("#intJobCardId").val());
    			var error = 0;

    			
    			
    			if(!scriptValidation()){
    				error =1;
    			}
    			
    			if(error == 0){
    				
    				if(aryOwlId.length == 0 && error == 0){
    					alert("Enter at least one item");
    					error =1;
    				}
    				if(error == 0){
    					//alert(strContactName);
    					for(var i=0;i<aryOwlName.length;i++){
    						aryOwlCode[i] = decodeURIComponent(aryOwlCode[i]);
    						aryOwlName[i] = decodeURIComponent(aryOwlName[i]);
    						aryOwlQuantity[i] = decodeURIComponent(aryOwlQuantity[i]);
    						aryOwlDiscount[i] = decodeURIComponent(aryOwlDiscount[i]);
    						aryOwlUnitPrice[i] = decodeURIComponent(aryOwlUnitPrice[i]);
    						aryOwlSellingPrice[i] = decodeURIComponent(aryOwlSellingPrice[i]);
    						aryOwlNetAmount[i] = decodeURIComponent(aryOwlNetAmount[i]);
    						aryOwlId[i] = decodeURIComponent(aryOwlId[i]);
    						
    						aryOwlCode[i] = encodeURIComponent(aryOwlCode[i]);
    						aryOwlName[i] = encodeURIComponent(aryOwlName[i]);
    						aryOwlQuantity[i] = encodeURIComponent(aryOwlQuantity[i]);
    						aryOwlDiscount[i] = encodeURIComponent(aryOwlDiscount[i]);
    						aryOwlUnitPrice[i] = encodeURIComponent(aryOwlUnitPrice[i]);
    						aryOwlSellingPrice[i] = encodeURIComponent(aryOwlSellingPrice[i]);
    						aryOwlNetAmount[i] = encodeURIComponent(aryOwlNetAmount[i]);
    						aryOwlId[i] = encodeURIComponent(aryOwlId[i]);
    						
    					}
    					
    					
    				
    				
    					//$("#addPopOwl").attr('disabled','disabled');
    					tabModule = "Add Pop Owl"; 
    					arrSearch = new Array(0);
    					arrSearch[0] = new Array(0);
    					arrSearch[0][0] = 'aryOwlCode';
    					arrSearch[0][1] =  aryOwlCode;
    					arrSearch[1] = new Array(0);
    					arrSearch[1][0] = 'aryOwlName';
    					arrSearch[1][1] =  aryOwlName;
    					arrSearch[2] = new Array(0);
    					arrSearch[2][0] = 'aryOwlQuantity';
    					arrSearch[2][1] =  aryOwlQuantity;
    					arrSearch[3] = new Array(0);
    					arrSearch[3][0] = 'aryOwlSellingPrice';
    					arrSearch[3][1] =  aryOwlSellingPrice;
    					arrSearch[4] = new Array(0);
    					arrSearch[4][0] = 'aryOwlSellingPriceCost';
    					arrSearch[4][1] =  aryOwlSellingPriceCost;
    					arrSearch[5] = new Array(0);
    					arrSearch[5][0] = 'aryOwlNetAmount';
    					arrSearch[5][1] =  aryOwlNetAmount;
    					arrSearch[6] = new Array(0);
    					arrSearch[6][0] = 'aryOwlId';
    					arrSearch[6][1] =  aryOwlId;
    					arrSearch[7] = new Array(0);
    					arrSearch[7][0] = 'aryOwlDiscount';
    					arrSearch[7][1] =  aryOwlDiscount;
    					arrSearch[8] = new Array(0);
    					arrSearch[8][0] = 'aryOwlUnitPrice';
    					arrSearch[8][1] =  aryOwlUnitPrice;
    					arrSearch[9] = new Array(0);
    					arrSearch[9][0] = 'intJobCardId';
    					arrSearch[9][1] =  intJobCardId;
    					arrSearch[10] = new Array(0);
    					arrSearch[10][0] = 'event';
    					arrSearch[10][1] = 'addPopOwl';
    					
    					initiateAjaxRequest(arrSearch,gAdminPath+"/owl_work_jc/add_owl_work_jc.php");
    					
    				}	
    			}
    			if( error == 1)
    				return false;
    			else
    				return true;
    		});
    		$("#updatePopOwl").live( "click", function() {
    			var strValue = jQuery.trim($(this).val());
    			var intOwlTotal = jQuery.trim($("#intOwlTotal").val()); 
    			var intOwlTotalQuantity = jQuery.trim($("#intOwlTotalQuantity").val()); 
    			var fltOwlAmount= jQuery.trim($("#fltOwlAmount").val());
    			var intOwlToGroupId = jQuery.trim($("#intOwlToGroupId").val());
    			var intJobCardId = jQuery.trim($("#intJobCardId").val());
    			var error = 0;

    			
    			
    			if(!scriptValidation()){
    				error =1;
    			}
    			if(error == 0){
    				
    				/*if(aryOwlId.length == 0 && error == 0){
    					alert("Enter at least one item");
    					error =1;
    				}*/
    				if(error == 0){
    					//alert(strContactName);
    					for(var i=0;i<aryOwlName.length;i++){
    						aryOwlCode[i] = decodeURIComponent(aryOwlCode[i]);
    						aryOwlName[i] = decodeURIComponent(aryOwlName[i]);
    						aryOwlQuantity[i] = decodeURIComponent(aryOwlQuantity[i]);
    						aryOwlSellingPrice[i] = decodeURIComponent(aryOwlSellingPrice[i]);
    						aryOwlDiscount[i] = decodeURIComponent(aryOwlDiscount[i]);
    						aryOwlUnitPrice[i] = decodeURIComponent(aryOwlUnitPrice[i]);
    						aryOwlNetAmount[i] = decodeURIComponent(aryOwlNetAmount[i]);
    						aryOwlId[i] = decodeURIComponent(aryOwlId[i]);
    						
    						aryOwlCode[i] = encodeURIComponent(aryOwlCode[i]);
    						aryOwlName[i] = encodeURIComponent(aryOwlName[i]);
    						aryOwlQuantity[i] = encodeURIComponent(aryOwlQuantity[i]);
    						aryOwlSellingPrice[i] = encodeURIComponent(aryOwlSellingPrice[i]);
    						aryOwlDiscount[i] = encodeURIComponent(aryOwlDiscount[i]);
    						aryOwlUnitPrice[i] = encodeURIComponent(aryOwlUnitPrice[i]);
    						aryOwlNetAmount[i] = encodeURIComponent(aryOwlNetAmount[i]);
    						aryOwlId[i] = encodeURIComponent(aryOwlId[i]);
    					}
    					
    					//$("#addPopOwl").attr('disabled','disabled');
    					tabModule = "Update Pop Owl"; 
    					arrSearch = new Array(0);
    					arrSearch[0] = new Array(0);
    					arrSearch[0][0] = 'aryOwlCode';
    					arrSearch[0][1] =  aryOwlCode;
    					arrSearch[1] = new Array(0);
    					arrSearch[1][0] = 'aryOwlName';
    					arrSearch[1][1] =  aryOwlName;
    					arrSearch[2] = new Array(0);
    					arrSearch[2][0] = 'aryOwlQuantity';
    					arrSearch[2][1] =  aryOwlQuantity;
    					arrSearch[3] = new Array(0);
    					arrSearch[3][0] = 'aryOwlSellingPrice';
    					arrSearch[3][1] =  aryOwlSellingPrice;
    					arrSearch[4] = new Array(0);
    					arrSearch[4][0] = 'aryOwlSellingPriceCost';
    					arrSearch[4][1] =  aryOwlSellingPriceCost;
    					arrSearch[5] = new Array(0);
    					arrSearch[5][0] = 'aryOwlNetAmount';
    					arrSearch[5][1] =  aryOwlNetAmount;
    					arrSearch[6] = new Array(0);
    					arrSearch[6][0] = 'aryOwlId';
    					arrSearch[6][1] =  aryOwlId;
    					arrSearch[7] = new Array(0);
    					arrSearch[7][0] = 'intOwlToGroupId';
    					arrSearch[7][1] =  intOwlToGroupId;
    					arrSearch[8] = new Array(0);
    					arrSearch[8][0] = 'intOwlsparepartCount';
    					arrSearch[8][1] =  aryOwlId.length;
    					arrSearch[9] = new Array(0);
    					arrSearch[9][0] = 'aryOwlDiscount';
    					arrSearch[9][1] =  aryOwlDiscount;
    					arrSearch[10] = new Array(0);
    					arrSearch[10][0] = 'aryOwlUnitPrice';
    					arrSearch[10][1] =  aryOwlUnitPrice;
    					arrSearch[11] = new Array(0);
    					arrSearch[11][0] = 'intJobCardId';
    					arrSearch[11][1] =  intJobCardId;
    					arrSearch[12] = new Array(0);
    					arrSearch[12][0] = 'event';
    					arrSearch[12][1] = 'updatePopOwl';
    					
    					initiateAjaxRequest(arrSearch,gAdminPath+"/owl_work_jc/edit_owl_work_jc.php");
    					
    				}	
    			}
    			if( error == 1)
    				return false;
    			else
    				return true;
    		});
    		
    }

};

function callSalesSingleOwl(){
	var intOwlquantity = jQuery.trim($("#intOwlquantity").val());
	var fltOwlSellingPrice = jQuery.trim($("#fltOwlSellingPrice").val());
	var fltOwlDiscount  = jQuery.trim($("#fltOwlDiscount").val());
	var fltOwlNetAmount = 0.00;
	 
	if(!IsNumeric(intOwlquantity)){ 
		alert("Only Numbers are allowed");
		$("#intOwlquantity").val("0");
		$("#intOwlquantity").focus();
		return false;
	}else if(!IsNumeric(fltOwlSellingPrice)){ 
		alert("Only Numbers are allowed");
		$("#fltOwlSellingPrice").val("");
		$("#fltOwlSellingPrice").focus();
		return false;
	}
	
	if(intOwlquantity != "" && fltOwlSellingPrice != ""){
		fltOwlDiscount = Number(fltOwlDiscount).toFixed(2);
		fltOwlSellingPrice = Number(fltOwlSellingPrice).toFixed(2);
		fltOwlDiscountFCs = Number(fltOwlSellingPrice) * (Number(fltOwlDiscount)/100);
		fltOwlUnitPrice = Number(fltOwlSellingPrice) - Number(fltOwlDiscountFCs);
		fltOwlUnitPrice = Number(fltOwlUnitPrice).toFixed(2);
		
		//fltOwlNetAmount = Number(intOwlquantity) * Number(fltOwlUnitPrice);
		fltOwlNetAmount = Number(fltOwlUnitPrice);
		
		$("#fltOwlDiscount").val(fltOwlDiscount);
		$("#fltOwlSellingPrice").val(fltOwlSellingPrice);
		$("#fltOwlUnitPrice").val(fltOwlUnitPrice);
		fltOwlNetAmount = Number(fltOwlNetAmount).toFixed(2);
		$("#fltOwlNetAmount").val(fltOwlNetAmount);
	
	}

}
function salescalTotalAmountOwl(fltOwlNetAmount,fltOwlAmount){

	if(Number(fltOwlNetAmount) > 0)
		fltOwlAmount = Number(fltOwlAmount) + Number(fltOwlNetAmount); 

	fltOwlAmount = Number(fltOwlAmount).toFixed(2);
	$("#fltOwlAmount").val(fltOwlAmount);



}
function callSalesUpdateTotalOwl(aryOwlCount){

	var fltOwlNetAmount = jQuery.trim($("#fltOwlNetAmount").val());
	var fltOwlAmount = jQuery.trim($("#fltOwlAmount").val());
	var intOwlSlNo = jQuery.trim($("#intOwlSlNo").val());
	var intOwlquantity = jQuery.trim($("#intOwlquantity").val());
	var intOwlTotalQuantity = jQuery.trim($("#intOwlTotalQuantity").val());
	
	
	fltOwlAmount = Number(fltOwlAmount) - Number(aryOwlNetAmount[aryOwlCount]);
	fltOwlAmount = Number(fltOwlAmount) +  Number(fltOwlNetAmount);
	
	intOwlTotalQuantity =  Number(intOwlTotalQuantity) -  Number(aryOwlQuantity[aryOwlCount]);
	intOwlTotalQuantity = Number(intOwlTotalQuantity) + Number(intOwlquantity);
	
	
	
	fltOwlAmount = Number(fltOwlAmount).toFixed(2);
	
	
	$("#intOwlTotalQuantity").val(intOwlTotalQuantity);
	$("#fltOwlAmount").val(fltOwlAmount);
	

}
function clearOwlAryValue(){
	aryItemId = [] ;
	aryItemCode = [] ;
	aryItemName = [] ;
	aryQuantity = [] ;
	aryDiscount = [] ;
	aryUnitPrice = [] ;
	aryNetAmount = [] ;
	aryItemSellingPrice = [] ;
	aryItemSellingPriceCost = [] ;
	aryHiddenQuantity = [] ;
	aryHiddenItemSellingPrice = [] ;
	aryHiddenItemSellingPriceCost = [] ;
	arySlNo = [];
	aryCount = [];
	aryFileAttachment = [];
	arySystemName = [];
	aryFileName = [];
	arySlNoP = [] ;
	aryItemNameP = [] ;
	aryQuantityP = [] ;
	aryDiscountA = [] ;
	aryDiscountB = [] ;
	aryUnitPriceP = [] ;
	aryNetAmountP = [] ;
	aryItemSellingPriceCostP = [] ;
}

var attach = {
	    init: function () {
	    	
	    	
	    	$("#addAttach").live( "click", function() {
	    		
    			var error = 0;
    			 $("#intAttCountSlNo").focus();		
    			
    				 var strItemPicText = jQuery.trim($("#strItemPicText").val());
    				 var strFileName = jQuery.trim($("#strFileName").val());
    				 
    				 if(strItemPicText == ""){
    					 alert("Attach the file");
    					 $("#intAttCountSlNo").focus();
    						 
    					 error = 1;
    				 }else if(strFileName == ""){
    					 alert("Enter the file name");
    					 $("#strFileName").focus();
    				 }
    				 if(aryFileAttachment.length > 0){
    					 for(var i=0;i<aryFileAttachment.length;i++){
    						 if(strItemPicText == aryFileAttachment[i]){
    							alert("The file name already exist");
    							 error = 1;
    							 break;
    						 } 
    					 }
    				 }
    				 if(error == 0){
    					
    					 var count = jQuery.trim($("#intAttCountSlNo").val());
    					 var aryCount = 0;
    					
    					 if(error == 0){
    								
    						 		$("#intTotalAttach").val(jQuery.trim($("#intAttCountSlNo").val()));
    								aryCount = Number(count)-1;
    								arySlNo[aryCount] = count;
    								aryFileAttachment[aryCount] = strItemPicText;
    								aryFileName[aryCount] = strFileName;
    								$('#attchList > tbody:last').append("<tr id=\"at_"+aryCount+"\"  class=\"nodrag nodrop invoice-row-total\">" +
    									"<td style=\"width: 50px;\" >"+count+"</td>" +
    									"<td id=\"strFileName_"+aryCount+"\" >"+strFileName+"</td>" +
        								"<td id=\"strItemPicText_"+aryCount+"\" >"+strItemPicText+"</td>" +
    									 "<td class=\"td-center\">" +
    									 	"<a href=\"#\" class=\"btn btn-tiny confirmDelete deleteAttach\" id=\"deleteAttach_"+aryCount+"\" >Delete</a>" +
    								 	"</td>" +
    								 "</tr>");
    								
    								 count = Number(count)+1;
    								 $("#intAttCountSlNo").val(count);
    								 $("#strItemPicText").val("");
    								 $("#strFileName").val("");
    								 $("#intAttCountSlNo").focus();
    								  $(".addAttach").css("color","white");
    								
    								  
    								imag =  document.getElementById("strItemPic").files[0]
  						    		var fd = new FormData();
  						    		fd.append("strItemPic",imag); 
						             	  $.ajax({
	    					    				  url: gAdminPath+"/attachment/add_file_attachment.php?event=imageUpload", // Url to which the request is send
	    					    				  type: "POST",             // Type of request to be send, called as method
	    					    				  data: fd, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
	    					    				  contentType: false,       // The content type used when sending data to the server.
	    					    				  cache: false,             // To unable request pages to be cached
	    					    				  processData:false,        // To send DOMDocument or non processed data file it is set to false
	    					    				  success: function(data)   // A function to be called if request succeeds
	    					    				  {
	    					    					  response = data.split("||");
	    					    					  //$("#strItemPicText_"+aryCount).attr("src", gRootPath+gAttachUploadPath+response[1]);
	    					    					  arySystemName[aryCount] = response[1];
	    					    					 
	    					    				  }
	    					    		  });
    					}
    				}	 
    			
    			if( error == 1)
    				return false;
    			else
    				return true;
    		});
    		
    		
    		
    		$(".deleteAttach").live( "click", function() {
    			if (confirm('Are you sure you want to delete the selected items?')){
    				
    				var deleteSalesItemid = jQuery.trim($(this).attr('id'));
    				var deleteSalesItem = deleteSalesItemid.split("_");
	    			var aryCount = deleteSalesItem[1];
	    			for(i=aryCount ;i<aryFileAttachment.length;i++){
    						 tr = $('#at_'+i).html("");
    						tr.remove();
    						count = Number(i)+ 1;
    						if(count != aryFileAttachment.length){
    							
    							aryFileAttachment[i] = aryFileAttachment[count] ;
    							arySystemName[i] = arySystemName[count];
    							aryFileName[i] = aryFileName[count];
    							
    							if((Number(i) + 2) == aryItemId.length){
    								tr = $('#at_'+count).html("");
    								tr.remove();
    								arySlNo.pop();
    								aryFileAttachment.pop();
    								arySystemName.pop();
    								aryFileName.pop();
    								break;
    							} 
    						}else{
    							arySlNo.pop();
								aryFileAttachment.pop();
								arySystemName.pop();
								aryFileName.pop();
    							break;
    						}
    					}
    				
    					
    					for(i=aryCount ;i<aryFileAttachment.length;i++){
    						
    						$('#attchList > tbody:last').append("<tr id=\"at_"+i+"\"  class=\"nodrag nodrop invoice-row-total\">" +
    							 "<td style=\"width: 50px;\" >"+arySlNo[i]+"</td>" +
    							 "<td id=\"strFileName_"+i+"\" >"+aryFileName[i]+"</td>" +
 								 "<td id=\"strItemPicText_"+i+"\" >"+aryFileAttachment[i]+"</td>" +
    							 "<td class=\"td-center\">" +
    							 	"<a href=\"#\" class=\"btn btn-tiny confirmDelete deleteAttach\" id=\"deleteAttach_"+i+"\" >Delete</a>" +
    						 	"</td>" +
    						 "</tr>");
    					}
    						
    					var intAttCountSlNo = Number(jQuery.trim($("#intAttCountSlNo").val())) - 1;
    					var intTotalAttach = Number(jQuery.trim($("#intTotalAttach").val())) - 1;
    					$("#intAttCountSlNo").val(intAttCountSlNo);
    					$("#intTotalAttach").val(intTotalAttach);
    					
    			}		
    		});
    		
    		
    		$("#saveAttach").live( "click", function() {
    			var strValue = jQuery.trim($(this).val());
    			var intTotalAttach = jQuery.trim($("#intTotalAttach").val()); 
    			var error = 0;

    			
    			
    			if(!scriptValidation()){
    				error =1;
    			}
    			
    			if(error == 0){
    				
    				if(aryFileAttachment.length == 0 && error == 0){
    					alert("Enter at least one file");
    					error =1;
    				}
    				if(error == 0){
    					//alert(strContactName);
    					for(var i=0;i<aryFileAttachment.length;i++){
    						aryFileAttachment[i] = decodeURIComponent(aryFileAttachment[i]);
    						arySystemName[i] = decodeURIComponent(arySystemName[i]);
    						aryFileName[i] = decodeURIComponent(aryFileName[i]);
    						
    						aryFileAttachment[i] = encodeURIComponent(aryFileAttachment[i]);
    						arySystemName[i] = encodeURIComponent(arySystemName[i]);
    						aryFileName[i] = encodeURIComponent(aryFileName[i]);
    							
    					}
    					
    					//$("#addPopSepareparts").attr('disabled','disabled');
    					tabModule = "Add File Attach"; 
    					arrSearch = new Array(0);
    					arrSearch[0] = new Array(0);
    					arrSearch[0][0] = 'aryFileAttachment';
    					arrSearch[0][1] =  aryFileAttachment;
    					arrSearch[1] = new Array(0);
    					arrSearch[1][0] = 'arySystemName';
    					arrSearch[1][1] =  arySystemName;
    					arrSearch[2] = new Array(0);
    					arrSearch[2][0] = 'aryFileName';
    					arrSearch[2][1] =  aryFileName;
    					arrSearch[3] = new Array(0);
    					arrSearch[3][0] = 'event';
    					arrSearch[3][1] = 'addfile';
    					
    					initiateAjaxRequest(arrSearch,gAdminPath+"/attachment/add_file_attachment.php");
    					
    				}	
    			}
    			if( error == 1)
    				return false;
    			else
    				return true;
    		});
    		$("#updateAttach").live( "click", function() {
    			var strValue = jQuery.trim($(this).val());
    			var intTotalAttach = jQuery.trim($("#intTotalAttach").val()); 
    			var intAttachGroupId = jQuery.trim($("#intAttachGroupId").val()); 
    			var error = 0;

    			
    			
    			if(!scriptValidation()){
    				error =1;
    			}
    			
    			if(error == 0){
    				
    				if(aryFileAttachment.length == 0 && error == 0){
    					alert("Enter at least one file");
    					error =1;
    				}
    				if(error == 0){
    					//alert(strContactName);
    					for(var i=0;i<aryFileAttachment.length;i++){
    						aryFileAttachment[i] = decodeURIComponent(aryFileAttachment[i]);
    						arySystemName[i] = decodeURIComponent(arySystemName[i]);
    						aryFileName[i] = decodeURIComponent(aryFileName[i]);
    						
    						aryFileAttachment[i] = encodeURIComponent(aryFileAttachment[i]);
    						arySystemName[i] = encodeURIComponent(arySystemName[i]);
    						aryFileName[i] = encodeURIComponent(aryFileName[i]);	
    					}
    					
    					//$("#addPopSepareparts").attr('disabled','disabled');
    					tabModule = "Update File Attach"; 
    					arrSearch = new Array(0);
    					arrSearch[0] = new Array(0);
    					arrSearch[0][0] = 'aryFileAttachment';
    					arrSearch[0][1] =  aryFileAttachment;
    					arrSearch[1] = new Array(0);
    					arrSearch[1][0] = 'arySystemName';
    					arrSearch[1][1] =  arySystemName;
    					arrSearch[2] = new Array(0);
    					arrSearch[2][0] = 'intAttachGroupId';
    					arrSearch[2][1] =  intAttachGroupId;
    					arrSearch[3] = new Array(0);
    					arrSearch[3][0] = 'intFileCount';
    					arrSearch[3][1] =  aryFileAttachment.length;
    					arrSearch[4] = new Array(0);
    					arrSearch[4][0] = 'aryFileName';
    					arrSearch[4][1] =  aryFileName;
    					arrSearch[5] = new Array(0);
    					arrSearch[5][0] = 'event';
    					arrSearch[5][1] = 'updatefile';
    					
    					initiateAjaxRequest(arrSearch,gAdminPath+"/attachment/edit_file_attachment.php");
    					
    				}	
    			}
    			if( error == 1)
    				return false;
    			else
    				return true;
    		});
    		
    }

};

var work = {
	    init: function () {
	    	$("input#dateAppointment").datepicker();
	    	$("input#dateDeliveyExpected").datepicker();
	    	
	    	
	    	$(".strContact").live( "change", function() {
	    		var strCustomerName = jQuery.trim($(this).val());
	    		var intContactId = jQuery.trim($(this).val());
	    		$(".strContact").val(intContactId);
	    	  if(jQuery.trim(intContactId) != ""){
	    			tabModule = "Get Vehicle List"; 
	    			arrSearch = new Array(0);
	    			arrSearch[0] = new Array(0);
	    			arrSearch[0][0] = 'intContactId';
	    			arrSearch[0][1] =  intContactId;
	    			arrSearch[1] = new Array(0);
	    			arrSearch[1][0] = 'event';
	    			arrSearch[1][1] = 'getContactVehicleList';
	    			initiateAjaxRequest(arrSearch,gAdminPath+"/vehicle/add_vehicle.php");
	    		}else{
	    			$("#intVehicleId").html("<option value=\"\">Select</option>");
					$("#strContactTelephone").val("");
					$("#strModel").val("");
					$("#strRegistrationNumber").val("");
					$("#intYear").val("");
					$("#intChassisNumber").val("");
					$("#fltMileage").val("");
					$("#strVehicleType").val("");
					$("#strFuelType").val("");
					$("#intCylinder").val("");
					
	    		}
	    		
	    	});
	    	
	    	$("#intVehicleId").live( "change", function() {
	    		var intVehicleId = jQuery.trim($(this).val());
	    		
	    		if(intVehicleId != ""){
	    			tabModule = "Vehicle Detail"; 
	    			arrSearch = new Array(0);
	    			arrSearch[0] = new Array(0);
	    			arrSearch[0][0] = 'intVehicleId';
	    			arrSearch[0][1] =  intVehicleId;
	    			arrSearch[1] = new Array(0);
	    			arrSearch[1][0] = 'event';
	    			arrSearch[1][1] = 'getVehicleDetail';
	    			initiateAjaxRequest(arrSearch,gAdminPath+"/vehicle/add_vehicle.php");
	    		}
	    	});
	    	
	    	
	    	
	    	$("#intComboId").live( "change", function() {
	    		var comboId = jQuery.trim($(this).val());
	    		    comboId = comboId.split("||");
	    		    if(comboId[1] == '')
	    		    	comboId[1] = 0.00;
	    		    $("#fltComboWorkAmount").val(comboId[1]);
	    		    getTotalWorkAmount();
	    	});
	    	
	    	
	    	$(".workDetail").live( "change", function() {
	    		var intWorkId = jQuery.trim($(this).val());
	    		$(".workDetail").val(intWorkId);
	    		if(intWorkId != ""){
	    			tabModule = "Work Detail"; 
	    			arrSearch = new Array(0);
	    			arrSearch[0] = new Array(0);
	    			arrSearch[0][0] = 'intWorkId';
	    			arrSearch[0][1] =  intWorkId;
	    			arrSearch[1] = new Array(0);
	    			arrSearch[1][0] = 'event';
	    			arrSearch[1][1] = 'getWorkDetail';
	    			initiateAjaxRequest(arrSearch,gAdminPath+"/work/add_work.php");
	    		}
	    	});
	    	
	    	
	    	
	    	
	    	
	    	
	    	$(".callSalesSingleWork").live( "change", function() {
	    		callSalesSingleWork();
	    		
	    	});
	    	
	    	$("#fltSparepartsAmount").live( "change", function() {
	    		$("#fltSparepartsAmount").attr("readonly", true); 
	    		getTotalWorkAmount();
	    		
	    	});
	    	
	    	$("#fltDiscountAmount").live( "change", function() {
	    		getTotalWorkAmount();
	    		
	    	});
	    	
	    	$("#fltSparePartsDeletion").live( "change", function() {
	    		getTotalWorkAmount();
	    		
	    	});
	    	$("#fltExcessCharge").live( "change", function() {
	    			getTotalWorkAmount();
	    		
	    	});
	    	$("#fltWorkUnitPrice").live( "change", function() {
	    		var fltWorkNetAmount = jQuery.trim($(this).val());
	    		$("#fltWorkNetAmount").val(fltWorkNetAmount);
	    	});
	    	
	    	$("#intInsureId").live( "change", function() {
	    		
	    		
	    		if($('#intInsureId').is(':checked')){
	    			$(".insDisplay").show();
	    		}else{
	    			$(".insDisplay").hide();
	    		}
	    		getTotalWorkAmount();
	    	});
	    	
	    	$("#addWork").live( "click", function() {
	    		var error = 0;
    			 $("#intWorkSlNo").focus();		
    			
    				 var intWorkId = jQuery.trim($("#strWorkCode").val());
    				 //var strWorkCode = jQuery.trim($("#strWorkCode").val());
    				// var strWorkName = jQuery.trim($("#strWorkName").val());
    				 var strWork = "";
    				 var outOfStock = "";
    				 if(strWorkCode != "" && strWorkName != ""){
    					 aryTempItemCode = jQuery.trim($("#strWorkCode option:selected").text());
    					 aryTempItemCode = aryTempItemCode.split("||");
    					 strWorkCode = jQuery.trim(aryTempItemCode[0]);
    					 aryTempItemName = jQuery.trim($("#strWorkName option:selected").text());
    					 aryTempItemName = aryTempItemName.split("||");
    					 strWorkName = jQuery.trim(aryTempItemName[0]);
    					
    				 }else{
    					 
    					 alert("Enter all field with correct values");
    					 $("#strWorkCode").focus();
    						 
    					 error = 1;
    				 }
    				 if(aryWorkCode.length > 0){
    					 for(var i=0;i<aryWorkCode.length;i++){
    						 if(strWorkCode == aryWorkCode[i]){
    							alert("The item already exist");
    							 error = 1;
    							 break;
    						 } 
    					 }
    				 }
    				 if(error == 0){
    					
    					 var strWorkDescription = jQuery.trim($("#strWorkDescription").val());
    					 var fltWorkHour = jQuery.trim($("#fltWorkHour").val());
    					 var fltWorkUnitPrice = $("#fltWorkUnitPrice").val();
    					 var fltWorkUnitPrice1 = $("#fltWorkUnitPrice1").val();
    					 var fltWorkUnitPrice2 = $("#fltWorkUnitPrice2").val();
    					 var fltWorkUnitPrice3 = $("#fltWorkUnitPrice3").val();
    					 var fltWorkNetAmount = $("#fltWorkNetAmount").val();
    					 var fltWorkAmount = $("#fltWorkAmount").val();
    					 var intWorkStaff = $("#intWorkStaff").val();
    					 var count = jQuery.trim($("#intWorkSlNo").val());
    					 var aryWorkCount = 0;
    					
    					 if(!IsNumeric(fltWorkHour) || Number(fltWorkHour) < 0){ 
    				 		alert("The hour should be a valid and greater than 0.");		
    				 		 $("#intWorkquantity").focus();
    				 		 error = 1;
    				 	}else if(!IsNumeric(fltWorkUnitPrice) || Number(fltWorkUnitPrice) < 0){ 
    				 		alert("The unit price should be a valid number greater than 0.");		
    						 $("#fltWorkUnitPrice").focus();
    						 error = 1; 
    				 	}else if(Number(fltWorkUnitPrice) < Number(fltWorkUnitPrice2)){ 
    				 		alert("The unit price should be a greater than minimum cost.");		
    						 $("#fltWorkUnitPrice").focus();
    						 error = 1;	 
    				 		 
    				 	}else if(intWorkStaff == ''){
    				 		alert("Select the staff");		
    				 		$("#intWorkStaff").focus();
    				 		error = 1; 
    				 	}else if(error == 0){
    				 		strWorkStaff = jQuery.trim($("#intWorkStaff option:selected").text());	
    				 			salescalTotalAmountWork(fltWorkNetAmount,fltWorkAmount);
    								
    								
    								var intTotalHour = jQuery.trim($("#intTotalHour").val());
    								intTotalHour = Number(intTotalHour) + Number(fltWorkHour);
    								$("#intTotalWork").val(jQuery.trim($("#intWorkSlNo").val()));
    								$("#intTotalHour").val(intTotalHour);
    								aryWorkCount = Number(count)-1;
    								aryWorkSlNo[aryWorkCount] = count;
    								aryWorkId[aryWorkCount] = intWorkId;
    								aryWorkCode[aryWorkCount] = strWorkCode;
    								aryWorkName[aryWorkCount] = strWorkName;
    								aryWorkDescription[aryWorkCount] = strWorkDescription;
    								aryWorkHour[aryWorkCount] = fltWorkHour;
    								aryWorkUnitPrice[aryWorkCount] = fltWorkUnitPrice;
    								aryWorkUnitPrice1[aryWorkCount] = fltWorkUnitPrice1;
    								aryWorkUnitPrice2[aryWorkCount] = fltWorkUnitPrice2;
    								aryWorkUnitPrice3[aryWorkCount] = fltWorkUnitPrice3;
    								aryWorkNetAmount[aryWorkCount] = fltWorkNetAmount;
    								aryWorkStaff[aryWorkCount] = strWorkStaff;
    								aryWorkStaffId[aryWorkCount] = intWorkStaff;
    								aryJCEdit[aryWorkCount] = 1;
    								
    								$('#workList > tbody:last').append("<tr id=\"w_"+aryWorkCount+"\"  class=\"nodrag nodrop invoice-row-total\">" +
    									 "<td style=\"width: 50px;\" >"+count+"</td>" +
    									 "<td>"+strWorkCode+"</td>" +
    									 "<td>"+strWorkName+"</td>" +
    									 "<td>"+strWorkDescription+"</td>" +
    									 "<td class=\"td-right\" id=\"fltWorkHour_"+aryWorkCount+"\" >"+fltWorkHour+"</td>" +
    									 "<td class=\"td-right\" id=\"fltWorkUnitPrice_"+aryWorkCount+"\" >"+fltWorkUnitPrice+"</td>" +
    									 "<td class=\"td-right\" id=\"fltWorkNetAmount_"+aryWorkCount+"\" >"+fltWorkNetAmount+"</td>" +
    									 "<td class=\"td-right\" id=\"strWorkStaff_"+aryWorkCount+"\" >"+strWorkStaff+"</td>" +
    									 "<td class=\"td-center\">" +
    	 									 "<a href=\"#\" class=\"btn btn-tiny edit_inv_item editWork\" id=\"editWork_"+aryWorkCount+"\" >Edit</a>" +
    									 	"<a href=\"#\" class=\"btn btn-tiny confirmDelete deleteWork\" id=\"deleteWork_"+aryWorkCount+"\" >Delete</a>" +
    								 	"</td>" +
    								 "</tr>");
    								
    								 count = Number(count)+1;
    								 $("#intWorkSlNo").val(count);
    								 $("#strWorkCode").val("");
    								 $("#strWorkName").val("");
    								 $("#strWorkDescription").val("");
    								 $("#fltWorkHour").val("0");
    								 $("#fltWorkUnitPrice").val("");
    								 $("#fltWorkUnitPrice1").val("0.00");
    								 $("#fltWorkUnitPrice2").val("0.00");
    								 $("#fltWorkUnitPrice3").val("0.00");
    								 $("#fltWorkNetAmount").val("0.00");
    								 $("#intWorkStaff").val("");
    								 $("#intWorkSlNo").focus();
    								 $(".workAdd").css("color","white");
    								 $("#intWorkId").val("");
    					}
    				}	 
    			
    			if( error == 1)
    				return false;
    			else
    				return true;
    		});
    		
    		$(".editWork").live( "click", function() {
    			 $("#intWorkSlNo").focus();	
    			var editSalesWork = $(this).attr('id');
    			var editSalesWorkid = editSalesWork.split("_");
    			var aryWorkCount = editSalesWorkid[1];
    			var $srtHtml = "";
    			
    			 $("#intWorkSlNo").val(aryWorkSlNo[aryWorkCount]);
    			 $("#strWorkCode").val(aryWorkId[aryWorkCount]);
    			 $("#strWorkName").val(aryWorkId[aryWorkCount]);
    			 $("#intWorkId").val(aryWorkId[aryWorkCount]);
    			 $("#strWorkDescription").val(aryWorkDescription[aryWorkCount]);
    			 $("#fltWorkHour").val(aryWorkHour[aryWorkCount]);
    			 $("#fltWorkNetAmount").val(aryWorkNetAmount[aryWorkCount]);
				 $("#intWorkStaff").val(aryWorkStaffId[aryWorkCount]);
				
				 $("#fltWorkUnitPrice1").val(aryWorkUnitPrice1[aryWorkCount]);
    			 $("#fltWorkUnitPrice2").val(aryWorkUnitPrice2[aryWorkCount]);
    			 $("#fltWorkUnitPrice3").val(aryWorkUnitPrice3[aryWorkCount]);
    			 /*if(aryWorkUnitPrice1[aryWorkCount] == aryWorkUnitPrice[aryWorkCount]){
    			 	$srtHtml = "<option  value='"+aryWorkUnitPrice1[aryWorkCount]+"'  selected='selected' >"+aryWorkUnitPrice1[aryWorkCount]+" </option>";	
    			 	$srtHtml += "<option  value='"+aryWorkUnitPrice2[aryWorkCount]+"' >"+aryWorkUnitPrice2[aryWorkCount]+" </option>";	
    			 	$srtHtml += "<option  value='"+aryWorkUnitPrice3[aryWorkCount]+"' >"+aryWorkUnitPrice3[aryWorkCount]+" </option>";	
    			 }else if(aryWorkUnitPrice2[aryWorkCount] == aryWorkUnitPrice[aryWorkCount]){		
    				 $srtHtml = "<option  value='"+aryWorkUnitPrice1[aryWorkCount]+"' >"+aryItemSellingPrice1[aryWorkCount]+" </option>";	
     			 	$srtHtml += "<option  value='"+aryWorkUnitPrice2[aryWorkCount]+"' selected='selected' >"+aryWorkUnitPrice2[aryWorkCount]+" </option>";	
     			 	$srtHtml += "<option  value='"+aryWorkUnitPrice3[aryWorkCount]+"' >"+aryWorkUnitPrice3[aryWorkCount]+" </option>";	
    			 }else if(aryWorkUnitPrice3[aryWorkCount] == aryWorkUnitPrice[aryWorkCount]){		
    				$srtHtml = "<option  value='"+aryWorkUnitPrice1[aryWorkCount]+"' >"+aryWorkUnitPrice1[aryWorkCount]+" </option>";	
     			 	$srtHtml += "<option  value='"+aryWorkUnitPrice2[aryWorkCount]+"'>"+aryWorkUnitPrice2[aryWorkCount]+" </option>";	
     			 	$srtHtml += "<option  value='"+aryWorkUnitPrice3[aryWorkCount]+"' selected='selected' >"+aryWorkUnitPrice3[aryWorkCount]+" </option>";	
    			 }*/
    			 $("#fltWorkUnitPrice").val(aryWorkUnitPrice[aryWorkCount]);
    			
    			 $("#addWork").hide();
    			 $("#updateWork").show();
    			 
    		});
    		
    		$(".deleteWork").live( "click", function() {
    			if (confirm('Are you sure you want to delete the selected items?')){
    				
    				var deleteSalesWorkid = jQuery.trim($(this).attr('id'));
    				var deleteSalesWork = deleteSalesWorkid.split("_");
	    			var aryWorkCount = deleteSalesWork[1];
	    			var hour = aryWorkHour[aryWorkCount];
	    			var fltWorkAmount = jQuery.trim($("#fltWorkAmount").val());
	    				fltWorkAmount = Number(fltWorkAmount) - aryWorkNetAmount[aryWorkCount]; 
    					for(i=aryWorkCount ;i<aryWorkId.length;i++){
    						 tr = $('#w_'+i).html("");
    						tr.remove();
    						count = Number(i)+ 1;
    						if(count != aryWorkId.length){
    							
    							aryWorkId[i] = aryWorkId[count] ;
    							aryWorkCode[i] = aryWorkCode[count];
    							aryWorkName[i] = aryWorkName[count];
    							aryWorkDescription[i] = aryWorkDescription[count];
    							aryWorkHour[i] = aryWorkHour[count];
    							aryWorkUnitPrice[i] = aryWorkUnitPrice[count];
    							aryWorkUnitPrice1[i] = aryWorkUnitPrice1[count];
    							aryWorkUnitPrice2[i] = aryWorkUnitPrice2[count];
    							aryWorkUnitPrice3[i] = aryWorkUnitPrice3[count];
    							aryWorkNetAmount[i] = aryWorkNetAmount[count];
    							aryWorkStaff[i] = aryWorkStaff[count];
    							aryWorkStaffId[i] = aryWorkStaffId[count];
    							aryJCEdit[i] = aryJCEdit[count];
    							if((Number(i) + 2) == aryWorkId.length){
    								tr = $('#w_'+count).html("");
    								tr.remove();
    								aryWorkSlNo.pop();
    								aryWorkId.pop();
    								aryWorkCode.pop();
    								aryWorkName.pop();
    								aryWorkDescription.pop();
    								aryWorkHour.pop();
    								aryWorkUnitPrice.pop();
    								aryWorkUnitPrice1.pop();
    								aryWorkUnitPrice2.pop();
    								aryWorkUnitPrice3.pop();
    								aryWorkNetAmount.pop();
    								aryWorkStaff.pop();
    								aryWorkStaffId.pop();
    								aryJCEdit.pop();
    								break;
    							} 
    						}else{
    							aryWorkSlNo.pop();
								aryWorkId.pop();
								aryWorkCode.pop();
								aryWorkName.pop();
								aryWorkDescription.pop();
								aryWorkHour.pop();
								aryWorkUnitPrice.pop();
								aryWorkUnitPrice1.pop();
								aryWorkUnitPrice2.pop();
								aryWorkUnitPrice3.pop();
								aryWorkNetAmount.pop();
								aryWorkStaff.pop();
								aryWorkStaffId.pop();
								aryJCEdit.pop();
    							break;
    						}
    					}
    				
    					
    					for(i=aryWorkCount ;i<aryWorkId.length;i++){
    						
    						$('#workList > tbody:last').append("<tr id=\"w_"+i+"\"  class=\"nodrag nodrop invoice-row-total\">" +
									 "<td style=\"width: 50px;\" >"+aryWorkSlNo[i]+"</td>" +
									 "<td>"+aryWorkCode[i]+"</td>" +
									 "<td>"+aryWorkName[i]+"</td>" +
									 "<td>"+aryWorkDescription[i]+"</td>" +
									 "<td class=\"td-right\" id=\"fltWorkHour_"+i+"\" >"+aryWorkHour[i]+"</td>" +
									 "<td class=\"td-right\" id=\"fltWorkUnitPrice_"+i+"\" >"+aryWorkUnitPrice[i]+"</td>" +
									 "<td class=\"td-right\" id=\"fltWorkNetAmount_"+i+"\" >"+aryWorkNetAmount[i]+"</td>" +
									 "<td class=\"td-right\" id=\"strWorkStaff_"+i+"\" >"+aryWorkStaff[i]+"</td>" +
	 									 "<td class=\"td-center\">" +
	 									 "<a href=\"#\" class=\"btn btn-tiny edit_inv_item editWork\" id=\"editWork_"+i+"\" >Edit</a>" +
									 	"<a href=\"#\" class=\"btn btn-tiny confirmDelete deleteWork\" id=\"deleteWork_"+i+"\" >Delete</a>" +
								 	"</td>" +
								 "</tr>");
    						
    						
    					}
    					
							
    					fltWorkNetAmount = 0.00;
    					salescalTotalAmountWork(fltWorkNetAmount,fltWorkAmount);
    					var intWorkSlNo = Number(jQuery.trim($("#intWorkSlNo").val())) - 1;
    					var intTotalWork = Number(jQuery.trim($("#intTotalWork").val())) - 1;
    					var intTotalHour = Number(jQuery.trim($("#intTotalHour").val())) - Number(hour);
    					$("#intWorkSlNo").val(intWorkSlNo);
    					$("#intTotalWork").val(intTotalWork);
    					$("#intTotalHour").val(intTotalHour);
    			}		
    		});
    		$("#updateWork").live( "click", function() {
    			var error = 0;
    			 $("#intWorkSlNo").focus();		
    			
    				 var intWorkId = jQuery.trim($("#strWorkCode").val());
    				// var strWorkCode = jQuery.trim($("#strWorkCode").val());
    				// var strWorkName = jQuery.trim($("#strWorkName").val());
    				 var strWork = "";
    				 var outOfStock = "";
    				 if(strWorkCode != "" && strWorkName != ""){
    					 aryTempItemCode = jQuery.trim($("#strWorkCode option:selected").text());
    					 aryTempItemCode = aryTempItemCode.split("||");
    					 strWorkCode = jQuery.trim(aryTempItemCode[0]);
    					 aryTempItemName = jQuery.trim($("#strWorkName option:selected").text());
    					 aryTempItemName = aryTempItemName.split("||");
    					 strWorkName = jQuery.trim(aryTempItemName[0]);
    					
    				 }else{
    					 
    					 alert("Enter all field with correct values");
    					 $("#strWorkCode").focus();
    						 
    					 error = 1;
    				 }
    				 var count = jQuery.trim($("#intWorkSlNo").val());
    				 if(aryWorkCode.length > 0){
    					 for(var i=0;i<aryWorkCode.length;i++){
    						 if(strWorkCode == aryWorkCode[i] && aryWorkCode[i] != aryWorkCode[Number(count)-1] ){
    							alert("The item already exist");
    							 error = 1;
    							 break;
    						 } 
    					 }
    				 }
    				 if(error == 0){
    					
    					 var strWorkDescription = jQuery.trim($("#strWorkDescription").val());
    					 var fltWorkHour = jQuery.trim($("#fltWorkHour").val());
    					 var fltWorkUnitPrice = $("#fltWorkUnitPrice").val();
    					 var fltWorkUnitPrice1 = $("#fltWorkUnitPrice1").val();
    					 var fltWorkUnitPrice2 = $("#fltWorkUnitPrice2").val();
    					 var fltWorkUnitPrice3 = $("#fltWorkUnitPrice3").val();
    					 var fltWorkNetAmount = $("#fltWorkNetAmount").val();
    					 var fltWorkAmount = $("#fltWorkAmount").val();
    					 var intWorkStaff = $("#intWorkStaff").val();
    					 var count = jQuery.trim($("#intWorkSlNo").val());
    					 
    					 var aryWorkCount = 0;
    					
    					 if(!IsNumeric(fltWorkHour) || Number(fltWorkHour) < 0){ 
    				 		alert("The hour should be a valid and greater than 0.");		
    				 		 $("#intWorkquantity").focus();
    				 		 error = 1;
    				 	}else if(!IsNumeric(fltWorkUnitPrice) || Number(fltWorkUnitPrice) < 0){ 
    				 		alert("The unit price should be a valid number greater than 0.");		
    						 $("#fltWorkUnitPrice").focus();
    						 error = 1;
    				 	}else if(Number(fltWorkUnitPrice) < Number(fltWorkUnitPrice2)){ 
    				 		alert("The unit price should be a greater than minimum cost.");		
    						 $("#fltWorkUnitPrice").focus();
    						 error = 1;	 	 
    				 	}else if(intWorkStaff == ''){
    				 		alert("Select the staff");		
    				 		$("#intWorkStaff").focus();
    				 		error = 1; 
    					}else if(error == 0){
    						if (confirm('Are you sure you want to update the selected work?')){
    								strWorkStaff = jQuery.trim($("#intWorkStaff option:selected").text());
    								aryWorkCount = Number(count)-1;
    								callSalesUpdateTotalWork(aryWorkCount);
    								

    						    	aryWorkSlNo[aryWorkCount] = count;
    								aryWorkId[aryWorkCount] = intWorkId;
    								aryWorkCode[aryWorkCount] = strWorkCode;
    								aryWorkName[aryWorkCount] = strWorkName;
    								aryWorkDescription[aryWorkCount] = strWorkDescription;
    								aryWorkHour[aryWorkCount] = fltWorkHour;
    								aryWorkUnitPrice[aryWorkCount] = fltWorkUnitPrice;
    								aryWorkUnitPrice1[aryWorkCount] = fltWorkUnitPrice1;
    								aryWorkUnitPrice2[aryWorkCount] = fltWorkUnitPrice2;
    								aryWorkUnitPrice3[aryWorkCount] = fltWorkUnitPrice3;
    								aryWorkNetAmount[aryWorkCount] = fltWorkNetAmount;
    								aryWorkStaff[aryWorkCount] = strWorkStaff;
    								aryWorkStaffId[aryWorkCount] = intWorkStaff;
    								aryJCEdit[aryWorkCount] = 1;
    								$('#w_'+aryWorkCount).html("<td style=\"width: 50px;\" >"+count+"</td>" +
    										 "<td>"+strWorkCode+"</td>" +
        									 "<td>"+strWorkName+"</td>" +
        									 "<td>"+strWorkDescription+"</td>" +
        									 "<td class=\"td-right\" id=\"fltWorkHour_"+aryWorkCount+"\" >"+fltWorkHour+"</td>" +
        									 "<td class=\"td-right\" id=\"fltWorkUnitPrice_"+aryWorkCount+"\" >"+fltWorkUnitPrice+"</td>" +
        									 "<td class=\"td-right\" id=\"fltWorkNetAmount_"+aryWorkCount+"\" >"+fltWorkNetAmount+"</td>" +
        									 "<td class=\"td-right\" id=\"strWorkStaff_"+aryWorkCount+"\" >"+strWorkStaff+"</td>" +
         									 "<td class=\"td-center\">" +
        	 									 "<a href=\"#\" class=\"btn btn-tiny edit_inv_item editWork\" id=\"editWork_"+aryWorkCount+"\" >Edit</a>" +
        									 	"<a href=\"#\" class=\"btn btn-tiny confirmDelete deleteWork\" id=\"deleteWork_"+aryWorkCount+"\" >Delete</a>" +
        								  "</td>");
    								
    								
    								 $("#intWorkSlNo").val( Number(aryWorkId.length) + 1);
    								 $("#strWorkCode").val("");
    								 $("#strWorkName").val("");
    								 $("#strWorkDescription").val("");
    								 $("#fltWorkHour").val("0");
    								 $("#fltWorkUnitPrice").val("");
    								 $("#fltWorkUnitPrice1").val("0.00");
    								 $("#fltWorkUnitPrice2").val("0.00");
    								 $("#fltWorkUnitPrice3").val("0.00");
    								 $("#fltWorkNetAmount").val("0.00");
    								 $("#intWorkSlNo").focus();
    								 $("#intWorkStaff").val();
    								 $("#updateWork").hide();
    								 $("#addWork").show();
    								 $(".itemAdd").css("color","white");
    								 $("#intWorkId").val("");
    						}
    					}
    				}	 
    			
    			if( error == 1)
    				return false;
    			else
    				return true;
    		});
    		
    		
    		$(".addJobCard").live( "click", function() {
    			
    			var strValue = jQuery.trim($(this).val());
    			var strJobCardNumber = jQuery.trim($("#strJobCardNumber").text());
    			var dateQuotation = jQuery.trim($("#utc_date_trans").val()); 
    			var intContactId = jQuery.trim($("#strContactId").val());
    			var strContactTelephone = jQuery.trim($("#strContactTelephone").val());
    			var strDriverName = jQuery.trim($("#strDriverName").val());
    			var strDriverPhoneNo = jQuery.trim($("#strDriverPhoneNo").val());
    			var intVehicleId = jQuery.trim($("#intVehicleId").val());
    			var strVehicleNumber = jQuery.trim($("#intVehicleId option:selected").text());
    			var strModel = jQuery.trim($("#strModel").val());
    			var strRegistrationNumber = jQuery.trim($("#strRegistrationNumber").val());
    			var fltMileage = jQuery.trim($("#fltMileage").val());
    			var intYear = jQuery.trim($("#intYear").val());
    			var intChassisNumber = jQuery.trim($("#intChassisNumber").val());
    			var strVehicleType = jQuery.trim($("#strVehicleType").val());
    			var strFuelType = jQuery.trim($("#strFuelType").val()); 
    			var intCylinder = jQuery.trim($("#intCylinder").val()); 
    			var strPoliceReport = jQuery.trim($("#strPoliceReport").val());
    			var intChargeIdNo = jQuery.trim($("#intChargeIdNo").val());
    			var	intInsureId = '0';
    			if($('#intInsureId').is(':checked'))
    				intInsureId = jQuery.trim($("#intInsureId").val());
    			var intInsureCompanyId = jQuery.trim($("#intInsureCompanyId").val());
    			var intTotalWork = jQuery.trim($("#intTotalWork").val());
    			var intTotalHour = jQuery.trim($("#intTotalHour").val());
    			var fltWorkAmount = jQuery.trim($("#fltWorkAmount").val());
    			var intComboId = jQuery.trim($("#intComboId").val());
    				intComboId = intComboId.split("||");
    				intComboId = intComboId[0];
    			var fltComboWorkAmount = jQuery.trim($("#fltComboWorkAmount").val());
    			var intToGroupId = jQuery.trim($("#intToGroupId").val());
    			var fltSparepartsAmount = jQuery.trim($("#fltSparepartsAmount").val());
    			var intOwlToGroupId = jQuery.trim($("#intOwlToGroupId").val());
    			var fltOwlAmountPop = jQuery.trim($("#fltOwlAmountPop").val());
    			var intAttachGroupId = jQuery.trim($("#intAttachGroupId").val());
    			var fltDiscountAmount = jQuery.trim($("#fltDiscountAmount").val());
    			var fltTotalAmount = jQuery.trim($("#fltTotalAmount").val());
    			var intJobCardStaffId = jQuery.trim($("#intJobCardStaffId").val());
    			var intQuotationId = jQuery.trim($("#intQuotationId").val());
    			var fltSparePartsDeletion = jQuery.trim($("#fltSparePartsDeletion").val());
    			var fltSparePartsDeletionAmt = jQuery.trim($("#fltSparePartsDeletionAmt").val());
    			var fltInsuranceAmount = jQuery.trim($("#fltInsuranceAmount").val());
    			var fltExcessCharge = jQuery.trim($("#fltExcessCharge").val());
    			var fltClientAmount = jQuery.trim($("#fltClientAmount").val());
    			var intJobCardId = jQuery.trim($("#intJobCardId").val());
    			var intPrfId = jQuery.trim($("#intPrfId").val());
    			var dateDeliveyExpected = jQuery.trim($("#dateDeliveyExpected").val());
    			var strDeliveyExpectedTime = jQuery.trim($("#strDeliveyExpectedTime").val());
    			var error = 0
    			
    			if(!scriptValidation()){
    				error = 1;
    				
    			}else if(dateQuotation == "" ){
    				alert("Select the dates");
    				error =1;
    			}else if(intContactId != "" ){
    				strContactName =  jQuery.trim($("#strContactId option:selected").text());
    				strContactCode =  jQuery.trim($("#strContactCode option:selected").text());
    				
    				if(intVehicleId == ''){
    					alert("Select the vehicle");
        				error =1;
    				}
    					
    			}else{
    				alert("Select the customer");
    				error =1;
    			}
    			
    				
    				if(aryWorkId.length == 0 && error == 0){
    					alert("Enter at least one item");
    					error =1;
    				}else if($('#intInsureId').is(':checked') && intInsureCompanyId == ""){
    					alert("Select the insurance company");
    					error =1;
    				}else if(intJobCardStaffId == ''){
    					alert("Select the staff");
    					error =1;
    				}
    					
    				if(error == 0){
    				
    					
    					for(var i=0;i<aryWorkId.length;i++){
    						aryWorkId[i] = decodeURIComponent(aryWorkId[i]);
    						aryWorkCode[i] = decodeURIComponent(aryWorkCode[i]);
    						aryWorkName[i] = decodeURIComponent(aryWorkName[i]);
    						aryWorkDescription[i] = decodeURIComponent(aryWorkDescription[i]);
    						aryWorkHour[i] = decodeURIComponent(aryWorkHour[i]);
    						aryWorkUnitPrice[i] = decodeURIComponent(aryWorkUnitPrice[i]);
    						aryWorkNetAmount[i] = decodeURIComponent(aryWorkNetAmount[i]);
    						aryWorkStaffId[i] = decodeURIComponent(aryWorkStaffId[i]);
    						aryJCEdit[i] = decodeURIComponent(aryJCEdit[i]);
    						
    						aryWorkId[i] = encodeURIComponent(aryWorkId[i]);
    						aryWorkCode[i] = encodeURIComponent(aryWorkCode[i]);
    						aryWorkName[i] = encodeURIComponent(aryWorkName[i]);
    						aryWorkDescription[i] = encodeURIComponent(aryWorkDescription[i]);
    						aryWorkHour[i] = encodeURIComponent(aryWorkHour[i]);
    						aryWorkUnitPrice[i] = encodeURIComponent(aryWorkUnitPrice[i]);
    						aryWorkNetAmount[i] = encodeURIComponent(aryWorkNetAmount[i]);
    						aryWorkStaffId[i] = encodeURIComponent(aryWorkStaffId[i]);
    						aryJCEdit[i] = encodeURIComponent(aryJCEdit[i]);
    					}
    					
    						
    			
    					      
    	    			       
    	    			    
    	    			   
    			
	    			if(enterCount == 0){
	    				if(intJobCardId != "")
	    					tabModule = "Update Job Card"; 
	    				else	
	    					tabModule = "Add Job Card"; 
    					arrSearch = new Array(0);
    					arrSearch[0] = new Array(0);
    					arrSearch[0][0] = 'intContactId';
    					arrSearch[0][1] =  encodeURIComponent(intContactId);
    					arrSearch[1] = new Array(0);
    					arrSearch[1][0] = 'strContactName';
    					arrSearch[1][1] =  encodeURIComponent(strContactName);
    					arrSearch[2] = new Array(0);
    					arrSearch[2][0] = 'strContactCode';
    					arrSearch[2][1] =  encodeURIComponent(strContactCode);
    					arrSearch[3] = new Array(0);
    					arrSearch[3][0] = 'strContactTelephone';
    					arrSearch[3][1] =  encodeURIComponent(strContactTelephone);
    					arrSearch[4] = new Array(0);
    					arrSearch[4][0] = 'strDriverName';
    					arrSearch[4][1] =  encodeURIComponent(strDriverName);
    					arrSearch[5] = new Array(0);
    					arrSearch[5][0] = 'strDriverPhoneNo';
    					arrSearch[5][1] =  encodeURIComponent(strDriverPhoneNo);
    					arrSearch[6] = new Array(0);
    					arrSearch[6][0] = 'intVehicleId';
    					arrSearch[6][1] =  encodeURIComponent(intVehicleId);
    					arrSearch[7] = new Array(0);
    					arrSearch[7][0] = 'strVehicleNumber';
    					arrSearch[7][1] =  encodeURIComponent(strVehicleNumber);
    					arrSearch[8] = new Array(0);
    					arrSearch[8][0] = 'strModel';
    					arrSearch[8][1] =  encodeURIComponent(strModel);
    					arrSearch[9] = new Array(0);
    					arrSearch[9][0] = 'strRegistrationNumber';
    					arrSearch[9][1] =  encodeURIComponent(strRegistrationNumber);
    					arrSearch[10] = new Array(0);
    					arrSearch[10][0] = 'intYear';
    					arrSearch[10][1] =  encodeURIComponent(intYear);
    					arrSearch[11] = new Array(0);
    					arrSearch[11][0] = 'intChassisNumber';
    					arrSearch[11][1] =  encodeURIComponent(intChassisNumber);
    					arrSearch[12] = new Array(0);
    					arrSearch[12][0] = 'strVehicleType';
    					arrSearch[12][1] =  encodeURIComponent(strVehicleType);
    					arrSearch[13] = new Array(0);
    					arrSearch[13][0] = 'strFuelType';
    					arrSearch[13][1] =  encodeURIComponent(strFuelType);
    					arrSearch[14] = new Array(0);
    					arrSearch[14][0] = 'intCylinder';
    					arrSearch[14][1] =  encodeURIComponent(intCylinder);
    					arrSearch[15] = new Array(0);
    					arrSearch[15][0] = 'strPoliceReport';
    					arrSearch[15][1] =  encodeURIComponent(strPoliceReport);
    					arrSearch[16] = new Array(0);
    					arrSearch[16][0] = 'intChargeIdNo';
    					arrSearch[16][1] =  encodeURIComponent(intChargeIdNo);
    					arrSearch[17] = new Array(0);
    					arrSearch[17][0] = 'intInsureId';
    					arrSearch[17][1] =  encodeURIComponent(intInsureId);
    					arrSearch[18] = new Array(0);
    					arrSearch[18][0] = 'intInsureCompanyId';
    					arrSearch[18][1] =  encodeURIComponent(intInsureCompanyId);
    					arrSearch[19] = new Array(0);
    					arrSearch[19][0] = 'intTotalWork';
    					arrSearch[19][1] =  encodeURIComponent(intTotalWork);
    					arrSearch[20] = new Array(0);
    					arrSearch[20][0] = 'intTotalHour';
    					arrSearch[20][1] =  encodeURIComponent(intTotalHour);
    					arrSearch[21] = new Array(0);
    					arrSearch[21][0] = 'fltWorkAmount';
    					arrSearch[21][1] =  encodeURIComponent(fltWorkAmount);
    					arrSearch[22] = new Array(0);
    					arrSearch[22][0] = 'intComboId';
    					arrSearch[22][1] =  encodeURIComponent(intComboId);
    					arrSearch[23] = new Array(0);
    					arrSearch[23][0] = 'fltComboWorkAmount';
    					arrSearch[23][1] =  encodeURIComponent(fltComboWorkAmount);
    					arrSearch[24] = new Array(0);
    					arrSearch[24][0] = 'fltSparepartsAmount';
    					arrSearch[24][1] =  encodeURIComponent(fltSparepartsAmount);
    					arrSearch[25] = new Array(0);
    					arrSearch[25][0] = 'fltOwlAmountPop';
    					arrSearch[25][1] =  encodeURIComponent(fltOwlAmountPop);
    					arrSearch[26] = new Array(0);
    					arrSearch[26][0] = 'intAttachGroupId';
    					arrSearch[26][1] =  encodeURIComponent(intAttachGroupId);
    					arrSearch[27] = new Array(0);
    					arrSearch[27][0] = 'fltDiscountAmount';
    					arrSearch[27][1] =  encodeURIComponent(fltDiscountAmount);
    					arrSearch[28] = new Array(0);
    					arrSearch[28][0] = 'fltTotalAmount';
    					arrSearch[28][1] =  encodeURIComponent(fltTotalAmount);
    					arrSearch[29] = new Array(0);
    					arrSearch[29][0] = 'intJobCardStaffId';
    					arrSearch[29][1] =  encodeURIComponent(intJobCardStaffId);
    					arrSearch[30] = new Array(0);
    					arrSearch[30][0] = 'aryWorkId';
    					arrSearch[30][1] =  aryWorkId;
    					arrSearch[31] = new Array(0);
    					arrSearch[31][0] = 'aryWorkCode';
    					arrSearch[31][1] =  aryWorkCode;
    					arrSearch[32] = new Array(0);
    					arrSearch[32][0] = 'aryWorkName';
    					arrSearch[32][1] =  aryWorkName;
    					arrSearch[33] = new Array(0);
    					arrSearch[33][0] = 'aryWorkDescription';
    					arrSearch[33][1] =  aryWorkDescription;
    					arrSearch[34] = new Array(0);
    					arrSearch[34][0] = 'aryWorkHour';
    					arrSearch[34][1] =  aryWorkHour;
    					arrSearch[35] = new Array(0);
    					arrSearch[35][0] = 'aryWorkUnitPrice';
    					arrSearch[35][1] =  aryWorkUnitPrice;
    					arrSearch[36] = new Array(0);
    					arrSearch[36][0] = 'aryWorkNetAmount';
    					arrSearch[36][1] =  aryWorkNetAmount;
    					arrSearch[37] = new Array(0);
    					arrSearch[37][0] = 'aryWorkStaffId';
    					arrSearch[37][1] =  aryWorkStaffId;
    					arrSearch[38] = new Array(0);
    					arrSearch[38][0] = 'fltSparePartsDeletion';
    					arrSearch[38][1] =  encodeURIComponent(fltSparePartsDeletion);
    					arrSearch[39] = new Array(0);
    					arrSearch[39][0] = 'fltSparePartsDeletionAmt';
    					arrSearch[39][1] =  encodeURIComponent(fltSparePartsDeletionAmt);
    					arrSearch[40] = new Array(0);
    					arrSearch[40][0] = 'fltInsuranceAmount';
    					arrSearch[40][1] =  encodeURIComponent(fltInsuranceAmount);
    					arrSearch[41] = new Array(0);
    					arrSearch[41][0] = 'fltExcessCharge';
    					arrSearch[41][1] =  encodeURIComponent(fltExcessCharge);
    					arrSearch[42] = new Array(0);
    					arrSearch[42][0] = 'fltClientAmount';
    					arrSearch[42][1] =  encodeURIComponent(fltClientAmount);
    					arrSearch[43] = new Array(0);
    					arrSearch[43][0] = 'intQuotationId';
    					arrSearch[43][1] =  encodeURIComponent(intQuotationId);
    					arrSearch[44] = new Array(0);
    					arrSearch[44][0] = 'intJobCardId';
    					arrSearch[44][1] =  encodeURIComponent(intJobCardId);
    					arrSearch[45] = new Array(0);
    					arrSearch[45][0] = 'aryJCEdit';
    					arrSearch[45][1] =  aryJCEdit;
    					arrSearch[46] = new Array(0);
    					arrSearch[46][0] = 'intPrfId';
    					arrSearch[46][1] =  encodeURIComponent(intPrfId);
    					arrSearch[47] = new Array(0);
    					arrSearch[47][0] = 'fltMileage';
    					arrSearch[47][1] =  encodeURIComponent(fltMileage);
    					arrSearch[48] = new Array(0);
    					arrSearch[48][0] = 'intToGroupId';
    					arrSearch[48][1] =  encodeURIComponent(intToGroupId);
    					arrSearch[49] = new Array(0);
    					arrSearch[49][0] = 'intOwlToGroupId';
    					arrSearch[49][1] =  encodeURIComponent(intOwlToGroupId);
    					arrSearch[51] = new Array(0);
    					arrSearch[51][0] = 'dateDeliveyExpected';
    					arrSearch[51][1] =  decodeURIComponent(dateDeliveyExpected);
    					arrSearch[52] = new Array(0);
    					arrSearch[52][0] = 'strDeliveyExpectedTime';
    					arrSearch[52][1] =  decodeURIComponent(strDeliveyExpectedTime);
    					arrSearch[50] = new Array(0);
    					arrSearch[50][0] = 'event';
    					if(intJobCardId != ""){
    						if(strValue == "Update & Print")
								arrSearch[50][1] = 'updateJobCardAndPdf';
							else	
								arrSearch[50][1] = 'updateJobCard';
							
							enterCount =1;
		    				initiateAjaxRequest(arrSearch,gAdminPath+"/job_card/edit_job_card.php");
	    				}
						
					
					}else{
							alert("Please wait");
					}
    			}
	    	});
    		
	    }
};
function callSalesSingleWork(){
	var fltWorkHour = jQuery.trim($("#fltWorkHour").val());
	var fltWorkUnitPrice = jQuery.trim($("#fltWorkUnitPrice").val());
	var fltWorkDiscount  = jQuery.trim($("#fltWorkDiscount").val());
	var fltWorkNetAmount = 0.00;
	 
	if(!IsNumeric(fltWorkHour)){ 
		alert("Only Numbers are allowed");
		$("#fltWorkHour").val("0");
		$("#fltWorkHour").focus();
		return false;
	}else if(!IsNumeric(fltWorkUnitPrice)){ 
		alert("Only Numbers are allowed");
		$("#fltWorkUnitPrice").val("");
		$("#fltWorkUnitPrice").focus();
		return false;
	}
	
	if(fltWorkHour != "" && fltWorkUnitPrice != ""){
		//fltWorkDiscount = Number(fltWorkDiscount).toFixed(2);
		fltWorkUnitPrice = Number(fltWorkUnitPrice).toFixed(2);
		//fltWorkDiscountFCs = Number(fltWorkUnitPrice) * (Number(fltWorkDiscount)/100);
		//fltWorkUnitPrice = Number(fltWorkUnitPrice) - Number(fltWorkDiscountFCs);
		//fltWorkUnitPrice = Number(fltWorkUnitPrice).toFixed(2);
		
		//fltWorkNetAmount = Number(fltWorkHour) * Number(fltWorkUnitPrice);
		fltWorkNetAmount =   Number(fltWorkUnitPrice);
		
		//$("#fltWorkDiscount").val(fltWorkDiscount);
		$("#fltWorkUnitPrice").val(fltWorkUnitPrice);
		$("#fltWorkUnitPrice").val(fltWorkUnitPrice);
		fltWorkNetAmount = Number(fltWorkNetAmount).toFixed(2);
		$("#fltWorkNetAmount").val(fltWorkNetAmount);
	
	}

}
function salescalTotalAmountWork(fltWorkNetAmount,fltWorkAmount){

	if(Number(fltWorkNetAmount) > 0)
		fltWorkAmount = Number(fltWorkAmount) + Number(fltWorkNetAmount); 

	fltWorkAmount = Number(fltWorkAmount).toFixed(2);
	$("#fltWorkAmount").val(fltWorkAmount);

	getTotalWorkAmount();

}
function callSalesUpdateTotalWork(aryWorkCount){

	var fltWorkNetAmount = jQuery.trim($("#fltWorkNetAmount").val());
	var fltWorkAmount = jQuery.trim($("#fltWorkAmount").val());
	var intWorkSlNo = jQuery.trim($("#intWorkSlNo").val());
	var fltWorkHour = jQuery.trim($("#fltWorkHour").val());
	var intTotalHour = jQuery.trim($("#intTotalHour").val());
	
	
	fltWorkAmount = Number(fltWorkAmount) - Number(aryWorkNetAmount[aryWorkCount]);
	fltWorkAmount = Number(fltWorkAmount) +  Number(fltWorkNetAmount);
	
	intTotalHour =  Number(intTotalHour) -  Number(aryWorkHour[aryWorkCount]);
	intTotalHour = Number(intTotalHour) + Number(fltWorkHour);
	
	
	
	fltWorkAmount = Number(fltWorkAmount).toFixed(2);
	
	
	$("#intTotalHour").val(intTotalHour);
	$("#fltWorkAmount").val(fltWorkAmount);
	getTotalWorkAmount();

}
function getTotalWorkAmount(){
	var fltWorkAmount = jQuery.trim($("#fltWorkAmount").val());
	var fltComboWorkAmount = jQuery.trim($("#fltComboWorkAmount").val());
	var fltSparepartsAmount = jQuery.trim($("#fltSparepartsAmount").val());
	var fltOwlAmountPop = jQuery.trim($("#fltOwlAmountPop").val());
	var fltDiscountAmount = jQuery.trim($("#fltDiscountAmount").val());
	
	var fltSparePartsDeletion = jQuery.trim($("#fltSparePartsDeletion").val());
	var fltSparePartsDeletionAmt = jQuery.trim($("#fltSparePartsDeletionAmt").val());
	var fltInsuranceAmount = jQuery.trim($("#fltInsuranceAmount").val());
	var fltExcessCharge = jQuery.trim($("#fltExcessCharge").val());
	var fltClientAmount = jQuery.trim($("#fltClientAmount").val());
	var fltTotalAmount = 0.00;
	var fltSparePartsDeletionAmtAft = "0.00";
	/*fltWorkAmount = Number(fltWorkAmount).toFixed(2);
	fltComboWorkAmount = Number(fltComboWorkAmount).toFixed(2);
	fltSparepartsAmount = Number(fltSparepartsAmount).toFixed(2);
	fltOwlAmountPop = Number(fltOwlAmountPop).toFixed(2);
	fltDiscountAmount = Number(fltDiscountAmount).toFixed(2);*/
	
	if($('#intInsureId').is(':checked')){
		if(Number(fltSparepartsAmount) > Number(0)){
			fltSparePartsDeletionAmt = Number(fltSparepartsAmount) * (Number(fltSparePartsDeletion)/100);
			fltSparePartsDeletionAmtAft = Number(fltSparepartsAmount) - Number(fltSparePartsDeletionAmt);
			
		}else{
			fltSparePartsDeletion = "0.00";
			fltSparePartsDeletionAmt = "0.00";
			fltSparePartsDeletionAmtAft = "0.00";
		}
		
		fltInsuranceAmount = (Number(fltWorkAmount) + Number(fltComboWorkAmount) + Number(fltSparepartsAmount) + Number(fltOwlAmountPop) ) - Number(fltSparePartsDeletionAmt);
		
		fltClientAmount = (Number(fltSparePartsDeletionAmt) + Number(fltExcessCharge)) - Number(fltDiscountAmount);
	}else{
		fltSparePartsDeletion = "0.00";
		fltSparePartsDeletionAmt = "0.00";
		fltSparePartsDeletionAmtAft = "0.00";
		fltInsuranceAmount = "0.00";
		fltExcessCharge = "0.00";
		fltClientAmount = (Number(fltWorkAmount) + Number(fltComboWorkAmount) + Number(fltSparepartsAmount) + Number(fltOwlAmountPop)) - Number(fltDiscountAmount);
	}
	
	fltTotalAmount = (Number(fltWorkAmount) + Number(fltComboWorkAmount) + Number(fltSparepartsAmount) + Number(fltOwlAmountPop) + Number(fltExcessCharge)) - Number(fltDiscountAmount);
	
	fltSparePartsDeletion = Number(fltSparePartsDeletion).toFixed(2);
	fltSparePartsDeletionAmt = Number(fltSparePartsDeletionAmt).toFixed(2);
	fltSparePartsDeletionAmtAft = Number(fltSparePartsDeletionAmtAft).toFixed(2);
	fltInsuranceAmount = Number(fltInsuranceAmount).toFixed(2);
	fltExcessCharge = Number(fltExcessCharge).toFixed(2);
	fltClientAmount = Number(fltClientAmount).toFixed(2);
	fltTotalAmount = Number(fltTotalAmount).toFixed(2);
	
	$("#fltSparePartsDeletion").val(fltSparePartsDeletion);
	$("#fltSparePartsDeletionAmt").val(fltSparePartsDeletionAmt);
	$("#fltSparePartsDeletionAmtAft").val(fltSparePartsDeletionAmtAft);
	$("#fltInsuranceAmount").val(fltInsuranceAmount);
	$("#fltExcessCharge").val(fltExcessCharge);
	$("#fltClientAmount").val(fltClientAmount);
	$("#fltTotalAmount").val(fltTotalAmount);
	
}

var PRF = {
	    init: function () {
	    	
	    	$(".strSupplierCode").live( "change", function() {
	    		var intContactId = jQuery.trim($(this).val());
	    		$(".strSupplierCode").val(intContactId);
	    	});
	    	
	    	$(".callSalesSingleItemP").live( "change", function() {
	    		callSalesSingleItemP();
	    		
	    	});
	    	
	$("#addItemP").live( "click", function() {
	    		
    			var error = 0;
    			 $("#intSlNoP").focus();		
    			
    				 var strItemNameP = jQuery.trim($("#strItemNameP").val());
    				 var strItem = "";
    				 var outOfStock = "";
    				 if( strItemNameP == ""){
    					 alert("Enter the item Name");
    					 $("#strItemNameP").focus();
    						 
    					 error = 1;
    					
    				 }
    				 
    				 if(error == 0){
    					
    					 var intquantityP = jQuery.trim($("#intquantityP").val());
    					 
    					 var fltItemSellingPriceCostP = jQuery.trim($("#fltItemSellingPriceCostP").val());
    					 var fltDiscountA = $("#fltDiscountA").val();
    					 var fltDiscountB = $("#fltDiscountB").val();
    					 var fltUnitPriceP = jQuery.trim($("#fltUnitPriceP").val());
    					 var fltNetAmountP = jQuery.trim($("#fltNetAmountP").val());
    					 var fltItemAmountP = jQuery.trim($("#fltItemAmountP").val());
    					 var count = jQuery.trim($("#intSlNoP").val());
    					 var aryCount = 0;
    					
    					 if(!IsNumeric(intquantityP) || Number(intquantityP) <= 0){ 
    				 		alert("The quantity should be a valid integer greater than 0.");		
    				 		 $("#intquantity").focus();
    				 		 error = 1;
    				 	}else if(error == 0){
    								salescalTotalAmountP(fltNetAmountP,fltItemAmountP);
    								
    								
    								var intTotalItemQuantityP = jQuery.trim($("#intTotalItemQuantityP").val());
    								intTotalItemQuantityP = Number(intTotalItemQuantityP) + Number(intquantityP);
    								$("#intTotalItemP").val(jQuery.trim($("#intSlNoP").val()));
    								$("#intTotalItemQuantityP").val(intTotalItemQuantityP);
    								aryCount = Number(count)-1;
    								arySlNoP[aryCount] = count;
    								aryItemNameP[aryCount] = strItemNameP;
    								aryQuantityP[aryCount] = intquantityP;
    								aryDiscountA[aryCount] = fltDiscountA;
    								aryDiscountB[aryCount] = fltDiscountB;
    								aryUnitPriceP[aryCount] = fltUnitPriceP;
    								aryNetAmountP[aryCount] = fltNetAmountP;
    								aryItemSellingPriceCostP[aryCount] = fltItemSellingPriceCostP;
    								 $('#itemList > tbody:last').append("<tr id=\"itemPrf_"+aryCount+"\"  class=\"nodrag nodrop invoice-row-total\">" +
    									 "<td style=\"width: 50px;\" >"+count+"</td>" +
    									 "<td>"+strItemNameP+"</td>" +
    									 "<td class=\"td-right\" id=\"intquantityP_"+aryCount+"\" >"+intquantityP+"</td>" +
    									 "<td class=\"td-right\" id=\"fltItemSellingPriceCostP_"+aryCount+"\" >"+fltItemSellingPriceCostP+"</td>" +
    									 "<td class=\"td-right\" id=\"fltDiscountA_"+aryCount+"\" >"+fltDiscountA+"</td>" +
    									 "<td class=\"td-right\" id=\"fltDiscountB_"+aryCount+"\" >"+fltDiscountB+"</td>" +
    									 "<td class=\"td-right\" id=\"fltUnitPriceP_"+aryCount+"\" >"+fltUnitPriceP+"</td>" +
    									"<td class=\"td-right\" id=\"fltNetAmountP_"+aryCount+"\" >"+fltNetAmountP+"</td>" +
    	 									 "<td class=\"td-center\">" +
    									 	"<a href=\"#\" class=\"btn btn-tiny edit_inv_item editItemP\" id=\"editItemP_"+aryCount+"\" >Edit</a>" +
    									 	"<a href=\"#\" class=\"btn btn-tiny confirmDelete deleteItemP\" id=\"deleteItemP_"+aryCount+"\" >Delete</a>" +
    								 	"</td>" +
    								 "</tr>");
    								
    								 count = Number(count)+1;
    								 $("#intSlNoP").val(count);
    								 $("#strItemNameP").val("");
    								 $("#intquantityP").val("0");
    								 $("#fltDiscountA").val("0.00");
    								 $("#fltDiscountB").val("0.00");
    								 $("#fltUnitPriceP").val("0.00");
    								 $("#fltItemSellingPriceCostP").val("0.00");
    								 $("#fltNetAmountP").val("0.00");
    								 $("#intSlNoP").focus();
    								  $(".itemAddP").css("color","white");
    								
    					}
    				}	 
    			
    			if( error == 1)
    				return false;
    			else
    				return true;
    		});
    		
    		$(".editItemP").live( "click", function() {
    			 $("#intSlNoP").focus();	
    			var editSalesItemP = $(this).attr('id');
    			var editSalesItemidP = editSalesItemP.split("_");
    			var aryCount = editSalesItemidP[1];
    			
    			 $("#intSlNoP").val(arySlNoP[aryCount]);
    			 $("#strItemNameP").val(aryItemNameP[aryCount]);
    			 $("#intquantityP").val(aryQuantityP[aryCount]);
    			 $("#fltDiscountA").val(aryDiscountA[aryCount]);
    			 $("#fltDiscountB").val(aryDiscountB[aryCount]);
    			 $("#fltUnitPriceP").val(aryUnitPriceP[aryCount]);
    			 $("#fltItemSellingPriceCostP").val(aryItemSellingPriceCostP[aryCount]);
				 $("#fltNetAmountP").val(aryNetAmountP[aryCount]);
    			 
    			
    			 $("#addItemP").hide();
    			 $("#updateItemP").show();
    			 
    		});
    		
    		$(".deleteItemP").live( "click", function() {
    			if (confirm('Are you sure you want to delete the selected items?')){
    				
    				var deleteSalesItemidP = jQuery.trim($(this).attr('id'));
    				var deleteSalesItemP = deleteSalesItemidP.split("_");
	    			var aryCount = deleteSalesItemP[1];
	    			var qty = aryQuantityP[aryCount];
	    			var fltItemAmountP = jQuery.trim($("#fltItemAmountP").val());
	    				fltItemAmountP = Number(fltItemAmountP) - aryNetAmountP[aryCount]; 
    					for(i=aryCount ;i<aryItemNameP.length;i++){
    						 tr = $('#itemPrf_'+i).html("");
    						tr.remove();
    						count = Number(i)+ 1;
    						if(count != aryItemNameP.length){
    							
    							aryItemNameP[i] = aryItemNameP[count];
    							aryQuantityP[i] = aryQuantityP[count];
    							aryDiscountA[i] = aryDiscountA[count];
    							aryDiscountB[i] = aryDiscountB[count];
								aryUnitPriceP[i] = aryUnitPriceP[count];
    							aryNetAmountP[i] = aryNetAmountP[count];
    							aryItemSellingPriceCostP[i] = aryItemSellingPriceCostP[count];
    							if (typeof aryPrfSeparepartsId[i] !== 'undefined' && aryPrfSeparepartsId[i] != '') {
    								aryPrfSeparepartsId[i] = aryPrfSeparepartsId[count];
    							}	
    							if((Number(i) + 2) == aryItemNameP.length){
    								tr = $('#itemPrf_'+count).html("");
    								tr.remove();
    								arySlNoP.pop();
    								aryItemNameP.pop();
    								aryQuantityP.pop();
    								aryDiscountA.pop();
    								aryDiscountB.pop();
    								aryUnitPriceP.pop();
    								aryNetAmountP.pop();
    								aryItemSellingPriceCostP.pop();
    								if (typeof aryPrfSeparepartsId[i] !== 'undefined' && aryPrfSeparepartsId[i] != '') {
    								aryPrfSeparepartsId.pop();
    								}
    								break;
    							} 
    						}else{
    							arySlNoP.pop();
								aryItemNameP.pop();
								aryQuantityP.pop();
								aryDiscountA.pop();
								aryDiscountB.pop();
								aryUnitPriceP.pop();
								aryNetAmountP.pop();
								aryItemSellingPriceCostP.pop();
								if (typeof aryPrfSeparepartsId[i] !== 'undefined' && aryPrfSeparepartsId[i] != '') {
								aryPrfSeparepartsId.pop();
								}
								break;
    						}
    					}
    				
    					
    					for(i=aryCount ;i<aryItemNameP.length;i++){
    						
    						$('#itemList > tbody:last').append("<tr id=\"itemPrf_"+i+"\"  class=\"nodrag nodrop invoice-row-total\">" +
    							 "<td style=\"width: 50px;\" >"+arySlNoP[i]+"</td>" +
    							 "<td>"+aryItemNameP[i]+"</td>" +
    							 "<td class=\"td-right\">"+aryQuantityP[i]+"</td>" +
    							 "<td class=\"td-right\">"+aryItemSellingPriceCostP[i]+"</td>" +
    							 "<td class=\"td-right\" >"+aryDiscountA[i]+"</td>" +
    							 "<td class=\"td-right\" >"+aryDiscountB[i]+"</td>" +
								 "<td class=\"td-right\" >"+aryUnitPriceP[i]+"</td>" +
								 "<td class=\"td-right\">"+aryNetAmountP[i]+"</td>" + "<td class=\"td-center\">" +
    							 "<a href=\"#\" class=\"btn btn-tiny edit_inv_item editItemP\" id=\"editItemP_"+i+"\" >Edit</a>" +
    							 	"<a href=\"#\" class=\"btn btn-tiny confirmDelete deleteItemP\" id=\"deleteItemP_"+i+"\" >Delete</a>" +
    						 	"</td>" +
    						 "</tr>");
    					}
    					
							
    					fltNetAmount = 0.00;
    					salescalTotalAmountP(fltNetAmountP,fltItemAmountP);
    					var intSlNoP = Number(jQuery.trim($("#intSlNoP").val())) - 1;
    					var intTotalItemP = Number(jQuery.trim($("#intTotalItemP").val())) - 1;
    					var intTotalItemQuantityP = Number(jQuery.trim($("#intTotalItemQuantityP").val())) - Number(qty);
    					$("#intSlNoP").val(intSlNoP);
    					$("#intTotalItemP").val(intTotalItemP);
    					$("#intTotalItemQuantityP").val(intTotalItemQuantityP);
    			}		
    		});
    		$("#updateItemP").live( "click", function() {
    			var error = 0;
    			 $("#intSlNoP").focus();		
    			
    				 var strItemNameP = jQuery.trim($("#strItemNameP").val());
    				 var strItem = "";
    				 var outOfStock = "";
    				 if( strItemNameP == ""){
    					 alert("Enter all item name");
    					 $("#strItemNameP").focus();
    						 
    					 error = 1;
    					
    				 }
    				 var count = jQuery.trim($("#intSlNoP").val());
    				
    				 if(error == 0){
    					
    					 var intquantityP = jQuery.trim($("#intquantityP").val());
    					 var fltDiscountA = jQuery.trim($("#fltDiscountA").val());
    					 var fltDiscountB = jQuery.trim($("#fltDiscountB").val());
    					 var fltUnitPriceP = jQuery.trim($("#fltUnitPriceP").val());
    					 var fltItemSellingPriceCostP = $("#fltItemSellingPriceCostP").val();
    					 var fltNetAmountP = jQuery.trim($("#fltNetAmountP").val());
    					 var fltItemAmountP = jQuery.trim($("#fltItemAmountP").val());
    					
    					 var aryCount = 0;
    					 
    					 if(!IsNumeric(intquantityP) || Number(intquantityP) <= 0){ 
    				 		alert("The quantity should be a valid integer greater than 0.");		
    				 		 $("#intquantityP").focus();
    				 		 error = 1;
    				 		
    					}else if(error == 0){
    						if (confirm('Are you sure you want to update the selected items?')){
    								aryCount = Number(count)-1;
    								callSalesUpdateTotalItemP(aryCount);
    								
    								
    								arySlNoP[aryCount] = count;
    								aryItemNameP[aryCount] = strItemNameP;
    								aryQuantityP[aryCount] = intquantityP;
    								aryDiscountA[aryCount] = fltDiscountA;
    								aryDiscountB[aryCount] = fltDiscountB;
    								aryUnitPriceP[aryCount] = fltUnitPriceP;
    								aryNetAmountP[aryCount] = fltNetAmountP;
    								aryItemSellingPriceCostP[aryCount] = fltItemSellingPriceCostP;
    								$('#itemPrf_'+aryCount).html("<td style=\"width: 50px;\" >"+count+"</td>" +
    									 "<td>"+strItemNameP+"</td>" +
    									 "<td class=\"td-right\" id=\"intquantityP_"+aryCount+"\" >"+intquantityP+"</td>" +
    									 "<td class=\"td-right\" id=\"fltItemSellingPriceP"+aryCount+"\" >"+fltItemSellingPriceCostP+"</td>" +
    									 "<td class=\"td-right\" id=\"fltDiscountA_"+aryCount+"\" >"+fltDiscountA+"</td>" +
    									 "<td class=\"td-right\" id=\"fltDiscountB_"+aryCount+"\" >"+fltDiscountB+"</td>" +
    									 "<td class=\"td-right\" id=\"fltUnitPriceP_"+aryCount+"\" >"+fltUnitPriceP+"</td>" +
    									 "<td class=\"td-right\" id=\"fltNetAmountP_"+aryCount+"\" >"+fltNetAmountP+"</td>" +
    	 									 "<td class=\"td-center\">" +
    									 	"<a href=\"#\" class=\"btn btn-tiny edit_inv_item editItemP\" id=\"editItemP_"+aryCount+"\" >Edit</a>" +
    									 	"<a href=\"#\" class=\"btn btn-tiny confirmDelete deleteItemP\" id=\"deleteItemP_"+aryCount+"\" >Delete</a>" +
    								 	"</td>");
    								
    								 $("#intSlNoP").val( Number(aryItemNameP.length) + 1);
    								 $("#strItemNameP").val("");
    								 $("#intquantityP").val("0");
    								 $("#fltDiscountP").val("0.00");
    								 $("#fltUnitPriceP").val("0.00");
    								 $("#fltItemSellingPriceCostP").val("0.00");
    								 $("#fltNetAmountP").val("0.00");
    								 $("#intSlNoP").focus();
    								 $("#updateItemP").hide();
    								 $("#addItemP").show();
    								 $(".itemAddP").css("color","white");
    								 $("#intItemIdP").val("");
    						}
    					}
    				}	 
    			
    			if( error == 1)
    				return false;
    			else
    				return true;
    		});
    		
    		$(".savePrf").live( "click", function() {
    			var strValue = jQuery.trim($(this).val());
    			var intTotalItemP = jQuery.trim($("#intTotalItemP").val()); 
    			var intTotalItemQuantityP = jQuery.trim($("#intTotalItemQuantityP").val()); 
    			var fltItemAmountP = jQuery.trim($("#fltItemAmountP").val());
    			var strSupplierId = jQuery.trim($("#strSupplierId").val());
    			var intJobCardId = jQuery.trim($("#intJobCardId").val());
    			var error = 0;

    			
    			
    			if(!scriptValidation()){
    				error =1;
    			}
    			
    			if(error == 0){
    				
    				if(aryItemNameP.length == 0 && error == 0){
    					alert("Enter at least one item");
    					error =1;
    				}
    				if(error == 0){
    					//alert(strContactName);
    					for(var i=0;i<aryItemNameP.length;i++){
    						aryItemNameP[i] = decodeURIComponent(aryItemNameP[i]);
    						
    						aryItemNameP[i] = encodeURIComponent(aryItemNameP[i]);
    							
    					}
    					
    					
    					if(enterCount == 0){
    				
    					//$("#addPopSepareparts").attr('disabled','disabled');
    					tabModule = "Add PRF Pop Separeparts"; 
    					arrSearch = new Array(0);
    					arrSearch[0] = new Array(0);
    					arrSearch[0][0] = 'aryItemNameP';
    					arrSearch[0][1] =  aryItemNameP;
    					arrSearch[1] = new Array(0);
    					arrSearch[1][0] = 'aryQuantityP';
    					arrSearch[1][1] =  aryQuantityP;
    					arrSearch[2] = new Array(0);
    					arrSearch[2][0] = 'aryItemSellingPriceCostP';
    					arrSearch[2][1] =  aryItemSellingPriceCostP;
    					arrSearch[3] = new Array(0);
    					arrSearch[3][0] = 'aryNetAmountP';
    					arrSearch[3][1] =  aryNetAmountP;
    					arrSearch[4] = new Array(0);
    					arrSearch[4][0] = 'aryDiscountB';
    					arrSearch[4][1] =  aryDiscountB;
    					arrSearch[5] = new Array(0);
    					arrSearch[5][0] = 'aryDiscountA';
    					arrSearch[5][1] =  aryDiscountA;
    					arrSearch[6] = new Array(0);
    					arrSearch[6][0] = 'aryUnitPriceP';
    					arrSearch[6][1] =  aryUnitPriceP;
    					arrSearch[7] = new Array(0);
    					arrSearch[7][0] = 'strSupplierId';
    					arrSearch[7][1] =  strSupplierId;
    					arrSearch[8] = new Array(0);
    					arrSearch[8][0] = 'intJobCardId';
    					arrSearch[8][1] =  intJobCardId;
    					arrSearch[9] = new Array(0);
    					arrSearch[9][0] = 'strValue';
    					arrSearch[9][1] =  strValue;
    					arrSearch[10] = new Array(0);
    					arrSearch[10][0] = 'event';
    					arrSearch[10][1] = 'addPopSepareparts';
    					enterCount = 1;
    					initiateAjaxRequest(arrSearch,gAdminPath+"/prf/add_prf.php");
    					
    				}else{
						alert("Please wait");
					}		
    			  }
    			}
    			if( error == 1)
    				return false;
    			else
    				return true;
    		});
    		$(".updatePrf").live( "click", function() {
    			var strValue = jQuery.trim($(this).val());
    			var intTotalItemP = jQuery.trim($("#intTotalItemP").val()); 
    			var intTotalItemQuantityP = jQuery.trim($("#intTotalItemQuantityP").val()); 
    			var fltItemAmountP= jQuery.trim($("#fltItemAmountP").val());
    			var intPrfId = jQuery.trim($("#intPrfId").val());
    			var strSupplierId= jQuery.trim($("#strSupplierId").val());
    			var strPrfNumber = jQuery.trim($("#strPrfNumber").html());
    			var intJobCardId = jQuery.trim($("#intJobCardId").val());
    			var error = 0;

    			
    			
    			if(!scriptValidation()){
    				error =1;
    			}
    			if(error == 0){
    				
    				/*if(aryItemId.length == 0 && error == 0){
    					alert("Enter at least one item");
    					error =1;
    				}*/
    				if(error == 0){
    					//alert(strContactName);
    					for(var i=0;i<aryItemNameP.length;i++){
    						aryItemNameP[i] = decodeURIComponent(aryItemNameP[i]);
    						
    						aryItemNameP[i] = encodeURIComponent(aryItemNameP[i]);
    					}
    					 if(enterCount == 0){
    					//$("#addPopSepareparts").attr('disabled','disabled');
    					tabModule = "Update PRF Pop Separeparts"; 
    					arrSearch = new Array(0);
    					arrSearch[0] = new Array(0);
    					arrSearch[0][0] = 'aryItemNameP';
    					arrSearch[0][1] =  aryItemNameP;
    					arrSearch[1] = new Array(0);
    					arrSearch[1][0] = 'aryQuantityP';
    					arrSearch[1][1] =  aryQuantityP;
    					arrSearch[2] = new Array(0);
    					arrSearch[2][0] = 'aryItemSellingPriceCostP';
    					arrSearch[2][1] =  aryItemSellingPriceCostP;
    					arrSearch[3] = new Array(0);
    					arrSearch[3][0] = 'aryNetAmountP';
    					arrSearch[3][1] =  aryNetAmountP;
    					arrSearch[4] = new Array(0);
    					arrSearch[4][0] = 'aryDiscountA';
    					arrSearch[4][1] =  aryDiscountA;
    					arrSearch[5] = new Array(0);
    					arrSearch[5][0] = 'intPrfId';
    					arrSearch[5][1] =  intPrfId;
    					arrSearch[6] = new Array(0);
    					arrSearch[6][0] = 'intsparepartCount';
    					arrSearch[6][1] =  aryItemNameP.length;
    					arrSearch[7] = new Array(0);
    					arrSearch[7][0] = 'aryDiscountB';
    					arrSearch[7][1] =  aryDiscountB;
    					arrSearch[8] = new Array(0);
    					arrSearch[8][0] = 'aryUnitPriceP';
    					arrSearch[8][1] =  aryUnitPriceP;
    					arrSearch[9] = new Array(0);
    					arrSearch[9][0] = 'strSupplierId';
    					arrSearch[9][1] =  strSupplierId;
    					arrSearch[10] = new Array(0);
    					arrSearch[10][0] = 'strPrfNumber';
    					arrSearch[10][1] =  strPrfNumber;
    					arrSearch[11] = new Array(0);
    					arrSearch[11][0] = 'intJobCardId';
    					arrSearch[11][1] =  intJobCardId;
    					arrSearch[12] = new Array(0);
    					arrSearch[12][0] = 'strValue';
    					arrSearch[12][1] =  strValue;
    					arrSearch[13] = new Array(0);
    					arrSearch[13][0] = 'event';
    					arrSearch[13][1] = 'updatePopSepareparts';
    					enterCount = 1;
    					initiateAjaxRequest(arrSearch,gAdminPath+"/prf/add_prf.php");
    					
    				}else{
						alert("Please wait");
					}	
    				}
    			}
    			if( error == 1)
    				return false;
    			else
    				return true;
    		});
    		
    		$("#updatePopPrfList").live( "click", function() {
    			var strValue = jQuery.trim($(this).val());
    			var intTotalItemP = jQuery.trim($("#intTotalItemP").val()); 
    			var intTotalItemQuantityP = jQuery.trim($("#intTotalItemQuantityP").val()); 
    			var fltItemAmountP= jQuery.trim($("#fltItemAmountP").val());
    			var intJobCardId = jQuery.trim($("#intJobCardId").val());
    			var error = 0;

    			
    			
    			if(!scriptValidation()){
    				error =1;
    			}
    			if(error == 0){
    				
    				/*if(aryItemId.length == 0 && error == 0){
    					alert("Enter at least one item");
    					error =1;
    				}*/
    				if(error == 0){
    					//alert(strContactName);
    					for(var i=0;i<aryItemNameP.length;i++){
    						aryItemNameP[i] = encodeURIComponent(aryItemNameP[i]);
    					}
    					 if(enterCount == 0){
    					//$("#addPopSepareparts").attr('disabled','disabled');
    					tabModule = "Update PRF List"; 
    					arrSearch = new Array(0);
    					arrSearch[0] = new Array(0);
    					arrSearch[0][0] = 'aryItemNameP';
    					arrSearch[0][1] =  aryItemNameP;
    					arrSearch[1] = new Array(0);
    					arrSearch[1][0] = 'aryQuantityP';
    					arrSearch[1][1] =  aryQuantityP;
    					arrSearch[2] = new Array(0);
    					arrSearch[2][0] = 'aryItemSellingPriceCostP';
    					arrSearch[2][1] =  aryItemSellingPriceCostP;
    					arrSearch[3] = new Array(0);
    					arrSearch[3][0] = 'aryNetAmountP';
    					arrSearch[3][1] =  aryNetAmountP;
    					arrSearch[4] = new Array(0);
    					arrSearch[4][0] = 'aryDiscountA';
    					arrSearch[4][1] =  aryDiscountA;
    					arrSearch[5] = new Array(0);
    					arrSearch[5][0] = 'intsparepartCount';
    					arrSearch[5][1] =  aryItemNameP.length;
    					arrSearch[6] = new Array(0);
    					arrSearch[6][0] = 'aryDiscountB';
    					arrSearch[6][1] =  aryDiscountB;
    					arrSearch[7] = new Array(0);
    					arrSearch[7][0] = 'aryUnitPriceP';
    					arrSearch[7][1] =  aryUnitPriceP;
    					arrSearch[8] = new Array(0);
    					arrSearch[8][0] = 'intJobCardId';
    					arrSearch[8][1] =  intJobCardId;
    					arrSearch[9] = new Array(0);
    					arrSearch[9][0] = 'aryPrfSeparepartsId';
    					arrSearch[9][1] =  aryPrfSeparepartsId;
    					arrSearch[10] = new Array(0);
    					arrSearch[10][0] = 'event';
    					arrSearch[10][1] = 'updatePopSepareparts';
    					
    					enterCount = 1;
    					initiateAjaxRequest(arrSearch,gAdminPath+"/prf/prf_list_pop.php");
    				 }else{
 							alert("Please wait");
 						}		
    				}	
    			}
    			if( error == 1)
    				return false;
    			else
    				return true;
    		});
    		
	    }
};
function callSalesSingleItemP(){
	var intquantityP = jQuery.trim($("#intquantityP").val());
	var fltItemSellingPriceCostP = jQuery.trim($("#fltItemSellingPriceCostP").val());
	var fltDiscountA  = jQuery.trim($("#fltDiscountA").val());
	var fltDiscountB = jQuery.trim($("#fltDiscountB").val());
	var fltNetAmountP = 0.00;
	 
	if(!IsNumeric(intquantityP)){ 
		alert("Only Numbers are allowed");
		$("#intquantityP").val("0");
		$("#intquantitP").focus();
		return false;
	}else if(!IsNumeric(fltItemSellingPriceCostP)){ 
		alert("Only Numbers are allowed");
		$("#fltItemSellingPriceCostP").val("");
		$("#fltItemSellingPriceCostP").focus();
		return false;
	}
	
	if(intquantityP != "" && fltItemSellingPriceCostP != ""){
		fltDiscountA = Number(fltDiscountA).toFixed(2);
		fltItemSellingPriceCostP = Number(fltItemSellingPriceCostP).toFixed(2);
		fltDiscountFCs = Number(fltItemSellingPriceCostP) * (Number(fltDiscountB)/100);
		fltUnitPriceP = Number(fltItemSellingPriceCostP) - Number(fltDiscountFCs);
		fltUnitPriceP = Number(fltUnitPriceP).toFixed(2);
		
		
		
		
		fltNetAmountP = Number(intquantityP) * Number(fltUnitPriceP);
		
		
		$("#fltDiscountA").val(fltDiscountA);
		$("#fltDiscountB").val(fltDiscountB);
		$("#fltItemSellingPriceCostP").val(fltItemSellingPriceCostP);
		$("#fltUnitPriceP").val(fltUnitPriceP);
		fltNetAmountP = Number(fltNetAmountP).toFixed(2);
		$("#fltNetAmountP").val(fltNetAmountP);
	
	}

}
function salescalTotalAmountP(fltNetAmountP,fltItemAmountP){

	if(Number(fltNetAmountP) > 0)
		fltItemAmountP = Number(fltItemAmountP) + Number(fltNetAmountP); 

	fltItemAmountP = Number(fltItemAmountP).toFixed(2);
	$("#fltItemAmountP").val(fltItemAmountP);



}
function callSalesUpdateTotalItemP(aryCount){

	var fltNetAmountP = jQuery.trim($("#fltNetAmountP").val());
	var fltItemAmountP = jQuery.trim($("#fltItemAmountP").val());
	var intSlNoP = jQuery.trim($("#intSlNoP").val());
	var intquantityP = jQuery.trim($("#intquantityP").val());
	var intTotalItemQuantityP = jQuery.trim($("#intTotalItemQuantityP").val());
	
	
	fltItemAmountP = Number(fltItemAmountP) - Number(aryNetAmountP[aryCount]);
	fltItemAmountP = Number(fltItemAmountP) +  Number(fltNetAmountP);
	
	intTotalItemQuantityP =  Number(intTotalItemQuantityP) -  Number(aryQuantityP[aryCount]);
	intTotalItemQuantityP = Number(intTotalItemQuantityP) + Number(intquantityP);
	
	
	
	fltItemAmountP = Number(fltItemAmountP).toFixed(2);
	
	
	$("#intTotalItemQuantityP").val(intTotalItemQuantityP);
	$("#fltItemAmountP").val(fltItemAmountP);
	

}