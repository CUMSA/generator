var section_count = 0;
var secretary_name = "Damien";
var date = new Date();
var year = date.getFullYear(); 

function init() {
	$("#chead").append($("<p/>", { text: "Opening paragraph" }));
	$("#chead").append($("<textarea/>", { id: "chead_input" }));
	$("textarea").htmlarea({ toolbar: ["bold", "italic", "underline", "|", "link", "unlink"] });
}

function createNewSection() {
	section_count++;

	section = $("<div/>", { id: "csection_"+section_count, class: "csection" });
	section_controls = $("<div/>", { id: "csection_"+section_count+"_controls" });

	section_controls_form = $("<form/>");
	section_controls_form.append("Heading: ");
	section_controls_form.append($("<input/>", { type: "text", id: "csection_"+section_count+"_heading" }));
	section_controls_form.append("&nbsp;&nbsp;");
	section_controls_form.append("Subsection: ");
	section_controls_form.append($("<input/>", { type: "checkbox", id: "csection_"+section_count+"_sub" }));
	section_controls_form.append("&nbsp;&nbsp;");
	section_controls_form.append("Section filler: ");
	section_controls_form.append($("<input/>", { type: "checkbox", id: "csection_"+section_count+"_fill" }));
	section_controls_form.append("&nbsp;&nbsp;");
	section_controls_form.append("Category: ");
	section_controls_form_category = $("<select/>", { id: "csection_"+section_count+"_category" });
	section_controls_form_category.append($("<option/>", { value: "none", text: "None" }));
	section_controls_form_category.append($("<option/>", { value: "about-us", text: "About Us" }));
	section_controls_form_category.append($("<option/>", { value: "chronicle", text: "Chronicle" }));
	section_controls_form_category.append($("<option/>", { value: "contact-us", text: "Contact Us" }));
	section_controls_form_category.append($("<option/>", { value: "events", text: "Events" }));
	section_controls_form_category.append($("<option/>", { value: "feedback", text: "Feedback & Enquiries" }));
	section_controls_form_category.append($("<option/>", { value: "for-sponsors", text: "For Sponsors" }));
	section_controls_form_category.append($("<option/>", { value: "freshers", text: "Freshers" }));
	section_controls_form_category.append($("<option/>", { value: "membership", text: "Membership" }));
	section_controls_form_category.append($("<option/>", { value: "mental-health", text: "Mental Health Support" }));
	section_controls_form_category.append($("<option/>", { value: "opportunities", text: "Opportunities" }));
	section_controls_form_category.append($("<option/>", { value: "speakers", text: "Speaker Series" }));
	section_controls_form_category.append($("<option/>", { value: "sponsorship", text: "Sponsorship" }));
	section_controls_form.append(section_controls_form_category);
	section_controls_form.append("&nbsp;&nbsp;");

	delete_button = $("<button/>", { type: "button" , text: "Delete section" });
	delete_button.click(function () { $("#csection_"+section_count).remove(); });
	section_controls_form.append(delete_button);

	section_controls.append(section_controls_form);
	section.append(section_controls);
	section.append($("<textarea/>", { id: "csection_"+section_count+"_input" }));
	$("#csections").append(section);
	$("#csection_"+section_count+"_input").htmlarea({ toolbar: ["bold", "italic", "underline", "|", "link", "unlink"] });
}

function preview() {
	$("#code").empty();
	$("#preview").empty();
	var output = "";

	output += "<table width='800' border='0' cellspacing='2' cellpadding='0' style='font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.5em; color: #444444;'>";
	output += "<tr><td>";
	output += "<table width='800' border='0'><tr><td width='700' valign='middle'><img src='http://www.cumsa.org/images/logo_cumsa_chronicle.jpg' alt='Cambridge University Malaysia and Singapore Association' border='0' /></td><td width='100' align='right' valign='middle'><img src='http://www.cumsa.org/images/icon_chronicle_chronicle.jpg' alt='[Chronicle]' border='0' /></td></tr></table>";
	output += "</td></tr>";

	output += "<tr><td style='padding: 10px;'>";
	output += $.htmlClean($("#chead_input").val(), {
				allowedTags: ["table", "tr", "td", "img", "br", "hr", "a", "b", "i", "u", "strong", "em", "p"]
			});
	output += "<br /><hr width='400' color='#1166ff' />";
	output += "</td></tr>";

	var section = 1;
	var subsection = 1;

	var menu = "";
	var body = "";

	for ( i = 1; i <= section_count; i++ ) {
		if ( $("#csection_"+i).length != 0 ) {
			if ( $("#csection_"+i+"_category").val() == "none" ) {
				icon = "";
			} else {
				icon = "<img src='http://www.cumsa.org/images/icon_" + $("#csection_"+i+"_category").val() + "_chronicle.jpg' alt='[" +$("#csection_"+i+"_category option:selected").text() + "]' border='0' />";
			}

			if ( $("#csection_"+i+"_sub").prop("checked") ) {
				if ( subsection == 1 ) {
					section--;
				}
				heading = section + "." + subsection + " " + $("#csection_"+i+"_heading").val();
				menu +=  section + "." + subsection + " <a href='#csection" + i + "'>" + $("#csection_"+i+"_heading").val() + "</a><br />";
				subsection++;
			} else {
				if ( subsection != 1 ) {
					section++;
				}
				heading = section + ". " + $("#csection_"+i+"_heading").val();
				menu += section + ". <a href='#csection" + i + "'>" + $("#csection_"+i+"_heading").val() + "</a><br />";
				section++;
				subsection = 1;
			}

			body += "<tr><td>";
			body += "<table><tr>";

			if ( $("#csection_"+i+"_category").val() != "none" ) {
				body += "<td width='100' align='center' valign='center'>" + icon + "</td>";
				body += "<td id='csection" + i + "' name='csection" + i + "' width='700' valign='middle' style='padding: 10px; font-family: Georgia, serif; font-size: 21px; color: #333333; font-variant: small-caps;'>" + heading + "</td></tr></table>";
			} else {
				body += "<td id='csection" + i + "' name='csection" + i + "' width='800' valign='middle' style='padding: 10px; font-family: Georgia, serif; font-size: 21px; color: #333333; font-variant: small-caps;'>" + heading + "</td></tr></table>";
			}

			body += "</td></tr>";

			if ( $("#csection_"+i+"_fill").prop("checked") ) {
			} else {
				body += "<tr><td style='padding: 10px;'>";
				body += $.htmlClean($("#csection_"+i+"_input").val(), {
					allowedTags: ["table", "tr", "td", "img", "br", "hr", "a", "b", "i", "u", "strong", "em", "p"]
				});
				body += "<br /><br /></td></tr>";
			}
		}
	}

	output += "<tr><td style='padding: 10px;'>";
	output += menu;
	output += "<br /><hr width='400' color='#1166ff' />";
	output += "</td></tr>";

	output += body;

	output += "<tr><td style='padding: 10px;'><hr width='400' color='#1166ff' /><br />If you have any queries, please contact me at <a href='mailto:secretary@cumsa.org'>secretary@cumsa.org</a>.<br /><br />Best wishes,<br />" + secretary_name + "<br /><br /><hr width='400' color='#1166ff' /></td></tr>";

	// Start of Platinium and Gold Sponsors
	output += "<tr><td><table width='800' style='font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.5em; color: #444444;'>";

	output += "<tr>"; // Row 1
	output += "<td align='center' style='padding: 5px;'>Platinum Sponsors</td>";
	output += "<td align='center' style='padding: 5px;'>Gold Sponsors</td></tr>";
	output += "<tr>"; // Row2
	output += "<td align='center' style='padding: 5px;'><img src='http://www.cumsa.org/images/logo_osu.png' alt='Overseas Singaporean Unit' border='0' /></td>";
	output += "<td align='center' style='padding: 5px;'><img src='http://www.cumsa.org/images/logo_contactsg.jpg' alt='Contact Singapore' border='0' /></td></tr>";
	output += "<tr>"; // Row 3
	output += "<td align='center' style='padding: 5px;'><img src='http://www.cumsa.org/images/logo_leefoundation.png' alt='Lee Foundation' border='0' /></td>"
	output += "<td align='center' style='padding: 5px;'><img src='http://cumsa.org/images/logo_stee.png' alt='ST Electronics' border='0' /></td></tr>";
	output += "<tr>"; // Row 4
	output += "<td align='center' style='padding: 5px;'><img src='http://www.cumsa.org/images/logo_rajahtann.png' alt='Rajah and Tann' border='0' /></td>";
	output += "<td align='center' style='padding: 5px;'><img src='http://www.cumsa.org/images/logo_edb.png' alt='EDB Singapore' border='0' /></td></tr>";

	output += "</table></td></tr>";

	//Silver Sponsors
	output += "<tr><td><table width='800' style='font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.5em; color: #444444;'>";
	output += "<tr><td align='center' style='padding: 5px;'>Silver Sponsors</td>";
	output += "<tr><td align='center' style='padding: 5px;'><img src='http://www.cumsa.org/images/logo_gic.png' alt='Government of Singapore Investment Corporation' border='0' /></td>";
	output += "<tr><td align='center' style='padding: 5px;'><img src='http://cumsa.org/images/logo_BNP.png' alt='BNP Paribas' border='0' /></td>";
	output += "</table></td></tr>";
	//End of Silver Sponsors
	output += "<tr><td align='center' style='padding: 10px;'>";
	output += "Copyright " + year + " <a href='http://www.cumsa.org/'>Cambridge University Malaysia and Singapore Association</a>";
	output += "</td></tr>";
	output += "</table>";

	$("#code").text(output).html();
	$("#preview").append(output);
}
