const api = require("../utils/api");

const handlePostback = async (postback, profile, messageSender) => {
  switch (postback.payload) {
    case "GET_STARTED":
      messageSender
        .setMessage({
          text: `Hello ${profile.first_name || "my friend"}! How can I help?`
        })
        .send();
      break;

    case "QUICK_UPDATE":
      messageSender
        .setMessage({
          text: `Hi ${profile.first_name} how can I help you?`,
          quick_replies: [
            {
              content_type: "text",
              title: "Hospital near me",
              payload: "HNM",
              image_url:'https://cdn3.iconfinder.com/data/icons/small-color-v11/512/blood_drop_hospital_infusion_medical_transfusion-512.png'
            },
            {
              content_type: "text",
              title: "Checkpoints near me",
              payload: "CNM",
              image_url:"https://image.shutterstock.com/image-vector/road-closed-street-barrier-on-260nw-1212098479.jpg"
            }
          ]
        })
        .send();
      break;

    case "SEARCH":
      messageSender;
      messageSender
        .setMessage({
          text: `Hi ${profile.first_name} what do you want to know right now?`,
          quick_replies: [
            {
              content_type: "text",
              title: "Cases around the world",
              payload: "CATW",
              image_url:"https://i.pinimg.com/originals/dd/d5/0c/ddd50c7fd01a3a3927b932d8a5d4857c.png"
            },
            {
              content_type: "text",
              title: "Search COVID case",
              payload: "SCS",
              image_url:"https://png.pngtree.com/element_our/png_detail/20181206/find-vector-icon-png_260845.jpg"
            }
          ]
        })
        .send();
  }
};

const handleMessage = async (message, profile, messageSender) => {
  if (message.quick_reply) {
    const { payload } = message.quick_reply;

    console.log(payload);
 

    switch (payload) {
      case "CATW":
        const statsWorld= await api.worldTotalApi();
        messageSender
          .setMessage({
            text:
              "The world currently have: \n" +
              ` - ${statsWorld.total_cases} reported cases \n` +
              ` - ${statsWorld.total_deaths} deaths \n` +
              ` - ${statsWorld.total_recovered} recovered`
          })
          .send();
        break;
      case "SCS":
        messageSender
          .setMessage({
            text: `${profile.first_name} are you looking for the cases at the Philippines?`,
            quick_replies: [
              {
                content_type: "text",
                title: "Yes",
                payload: "PHYES"
              },
              {
                content_type: "text",
                title: "Other location",
                payload: "OTLC",
                image_url:
                  "https://cdn3.iconfinder.com/data/icons/marketing-add-on-colored/48/JD-11-512.png"
              }
            ]
          })
          .send();
        break;

      case "PHYES":
        const phname = "Philippines";
        const statsPH = await api.casesByRegionApi(phname);
        messageSender
          .setMessage({
            text: statsPH
              ? ` ${phname} currently have: \n` +
                ` - ${statsPH.cases} reported cases \n` +
                ` - ${statsPH.deaths} deaths \n` +
                ` - ${statsPH.total_recovered} recovered \n` +
                ` - ${statsPH.new_cases} new cases \n` +
                ` - ${statsPH.new_deaths} new cases \n` +
                `Stay safe ${profile.first_name || "my friend"}!`
              : `Sorry, we can't find your region.`
          })
          .send();
        break;
       case "OTLC":
        messageSender
        .setMessage({
          text: 'What country or region you are located? Just put a "/" first \n e.g. /China',
        })
        .send()
        break;

        case "HNM":
         console.log('Hospital Near Me')
         break;

        case "CNM":
          messageSender .setMessage({
           text:"send me your location",
           "quick_replies":[
            {
              "content_type":"text",
              "title":"Search",
              "payload":"<POSTBACK_PAYLOAD>",
              "image_url":"http://example.com/img/red.png"
            },
            {
              "content_type":"location"
            }
          ]
          })
        console.log('Checkpoint Near me')
        break;
    
       default:
       messageSender
       .setMessage({
         text: `Sorry I don't understand you stay safe  ${
           profile.first_name ? profile.first_name : "Little Warrior"
         }. To know more about kindly COVID see this link https://www.youtube.com/watch?v=95eNDcugOYU`
       })
       .send();
       break;
      
    }
  } else if (message.text) {
    if (message.text.startsWith("/")) {
      const searchTerm = message.text.split("/").join("");
      const stats = await api.casesByRegionApi(searchTerm);
      messageSender
        .setMessage({
          text: stats
            ? stats.country_name +
              " currently have: \n" +
              ` - ${stats.cases} reported cases \n` +
              ` - ${stats.deaths} deaths \n` +
              ` - ${stats.total_recovered} recovered \n` +
              ` - ${stats.new_cases} new cases \n` +
              ` - ${stats.new_deaths} new cases \n` +
              `Stay safe ${profile.first_name || "my friend"}!`
            : `Sorry, we can't find your region.`
        })
        .send();
  
        
    } else {
      messageSender
        .setMessage({
          text: `Sorry I don't understand you stay safe  ${
            profile.first_name ? profile.first_name : "Little Warrior"
          }. To know more about kindly COVID see this link https://www.youtube.com/watch?v=95eNDcugOYU`
        })
        .send();
    }
  }
};


module.exports = {
  handlePostback,
  handleMessage
};
