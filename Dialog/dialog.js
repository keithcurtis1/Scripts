on('ready', () => {
    on('chat:message', (msg) => {
        if ('api' === msg.type && /^!dialog/i.test(msg.content)) {
            let p = getObj('player', msg.playerid);
            let theMessage = "";
            let toName = "";
            let repeatCode = "";
            let tt=[]

            //CSS Declarations
            const openBox =         "<div style='margin-left:-30px; border: 0px none; margin-top: 10px; border-radius: 6px 6px 6px 6px;  box-shadow: 2px 2px 4px 2px #000; background-color: #ffffff; min-height:60px; display: block; padding:5px 5px 0px 5px; text-align: left;  white-space: pre-wrap; !important'>";
            const openQuoteBox =    "<div style='margin-left:-30px; border: 0px none; margin-top: 10px; border-radius: 35px 6px 6px 6px; box-shadow: 2px 2px 4px 2px #000; background-color: #e0e0d1; min-height:60px; display: block; padding:5px 5px 0px 5px; text-align: left;  white-space: pre-wrap;'>";
            const openWhisperBox =  "<div style='margin-left:-30px; border: 0px none; margin-top: 10px; border-radius: 35px 6px 6px 6px; box-shadow: 2px 2px 4px 2px #000; background-color: #666666; min-height:60px; display: block; padding:5px 5px 0px 5px; text-align: left;  white-space: pre-wrap;'>";
            const openoocBox =      "<div style='margin-left:-30px; border: 0px none; margin-top: 10px; border-radius: 35px 6px 6px 6px; box-shadow: 2px 2px 4px 2px #000; background-color: #ffffff; min-height:60px; display: block; padding:5px 5px 0px 5px; text-align: left;  white-space: pre-wrap;'>";
            const openEmoteBox =    "<div style='margin-left:-30px; border: 0px none; margin-top: 10px; border-radius: 35px 6px 6px 6px; box-shadow: 2px 2px 4px 2px #000; background-color: #68895d; min-height:60px; display: block; padding:5px 5px 0px 5px; text-align: left;  white-space: pre-wrap;'>";
            const openLanguageBox = "<div style='margin-left:-30px; border: 0px none; margin-top: 10px; border-radius: 35px 6px 6px 6px; box-shadow: 2px 2px 4px 2px #000; background-color: #68895d; background: rgb(212,196,140); background: linear-gradient(0deg, rgba(212,196,140,1) 0%, rgba(242,234,198,1) 100%); min-height:60px; display: block; padding:5px 5px 0px 5px; text-align: left;  white-space: pre-wrap;'>";
            const closeBox = "</div>";
            const quoteStyle =      `<p style = 'font-size: 1.4em; line-height:1.2; font-family: serif; font-style: italic; font-weight: 700; color: #372d16; margin: 5px;'>&#10077; `
            const whisperStyle =    `<p style = 'font-size: 1.4em; line-height:1.2; font-family: serif; font-style: italic; font-weight: 700; color: #f2f2f2; margin: 5px;'>`
            const oocStyle =        `<p style = 'font-size: 1.4em; line-height:1.2; font-family: serif; font-weight: 700; color: #372d16; margin: 5px;'>`
            const emoteStyle =      `<p style = 'font-size: 1.4em; line-height:1.2; font-family: serif; font-style: italic; font-weight: 700; color: #fff; margin: 5px;'>&#10095; `
            const languagetyle =    `<p style = 'font-size: 1.4em; line-height:1.2; font-family: serif; font-style: italic; font-weight: 700; color: #fff; margin: 5px;'>&#10095; `
            const buttonStyle =         "'background-color: transparent; align:right; font-size: 0.8em; line-height:1.2; font-family: sans-serif; font-style: normal; font-weight: normal; padding: 0px;color: #ce0f69;display: inline-block;border: none; !important'";
            const quoteButtonStyle =    "<a style = 'border: 0px none; background-color: #5b4b24; width:32%; text-align: center; font-size: 0.85em; font-family: sans-serif; font-style: normal; font-weight: normal; color: #fff; line-height:1.2; margin: 0px 1px 0px 1px; padding: 0px; display: inline-block !important'";
            const whisperButtonStyle =  "<a style = 'border: 0px none; background-color: #333;    width:32%; text-align: center; font-size: 0.85em; font-family: sans-serif; font-style: normal; font-weight: normal; color: #fff; line-height:1.2; margin: 0px 1px 0px 1px; padding: 0px; display: inline-block !important'";
            const oocButtonStyle =      "<a style = 'border: 0px none; background-color: #000;    width:32%; text-align: center; font-size: 0.85em; font-family: sans-serif; font-style: normal; font-weight: normal; color: #fff; line-height:1.2; margin: 0px 1px 0px 1px; padding: 0px; display: inline-block !important'";
            const emoteButtonStyle =    "<a style = 'border: 0px none; background-color: #3a4c34; width:32%; text-align: center; font-size: 0.85em; font-family: sans-serif; font-style: normal; font-weight: normal; color: #fff; line-height:1.2; margin: 0px 1px 0px 1px; padding: 0px; display: inline-block !important'";
            const languageButtonStyle = "<a style = 'border: 0px none; background-color: #3a4c34; width:32%; text-align: center; font-size: 0.85em; font-family: sans-serif; font-style: normal; font-weight: normal; color: #fff; line-height:1.2; margin: 0px 1px 0px 1px; padding: 0px; display: inline-block !important'";
            const helpText = openBox + "<div style = 'background-color: #000; color: #fff; line-height: 1.4em;!important'>** DIALOG 0.1**</div>"
            + "Dialog is a script that makes chat a bit more fun and easier to parse. It is token-based, either using selected and targeted tokens or specific token IDs."
            + "<BR>"
            + "<BR>"
            + "<code>**!Dialog** --id|*token_id* --to|*token_id* --type|*type* --*message*</code>"
            + "<BR>"
            + "<BR>"
            + "<code>--id|*token_id*</code>: Required. Specifies the speaker"
            + "<BR>"
            + "<BR>"
            + "<code>--to|*token_id*</code>: Optional. If a recipient is specified, the dialog becomes a whisper."
            + "<BR>"
            + "<BR>"
            + "<code>--type|*quote|whisper|emote|ooc*</code>: Optional. This determines the style of the dialog box to display. If not used, the script assumes an in-character quote. Whisper doesn't actually do anything, but is included as an option for making it plain that a whisper is intended. specifying a --to|*token_id* automatically chooses the whisper style."
            + "<BR>"
            + "<BR>"
            + "<code>--*message*</code>: anything placed after -- that does not match one of the other tags becomes the defacto message."
            + "<BR>"
            + "<BR>"
            + "**Token Image:** Clicking on the token image will repeat the last configuration. If you sent an emote, it will send another emote, propting you for the content. If you sent a whisper, it will send a whisper to the person you were whispering to. In this way, two characters who have started a whispered conversation can keep it going by just clicking on their token image in chat."
            + "<BR>"
            + "**Button Line:** There is a line of buttons at the bottom of the dialog that you can use to change the type of dialog. This will also set the token image button to repeat the dialog type."
            + "<BR>"
            + "**Note about whispers:** because the API cannot issue a target command, you must initiate a whisper using a macro. Once it is established, you can use the token image button."
            + "<BR>"
            + "<BR>"
            + "**Sample Macros**"
            + "<BR>"
            + "**Basic quote: **<code>!dialog --id|&#64;&#123;selected|token_id&#125; --?{message|message}</code>"
            + "<BR>"
            + "<BR>"
            + "**Start a whisper: **<code>!dialog --id|&#64;&#123;selected|token_id&#125; --&#64;&#123;target|token_id&#125; --?{message|message}</code>"
            + "<BR>"
            + "<BR>"
            + "<code>!dialog --help</code>: displays this help box."
            + closeBox;
            
            


            function makeButton(label, command, style) {
                return style + `href = '` + command + `'>` + label + `</a>`;
            }


            function imageFormat(imgsrc, tokenID) {
                return `<a style='background-color: transparent; float:left; border: none; !important' href = '${repeatCode}'><img style = 'max-height: 70px; margin:-15px 2px 5px -15px' src = '${imgsrc}'></a>`;
            }

            function messageFormat(theMessage) {
                return `${messageStyle}${theMessage}</p>`;
            }

            function isID(id) {
                return ((id.charAt(0) === "-" && id.length === 20) ? true : false);
            }


            function dialog(tokenImage, theMessage) {
                return '<a style = ' + buttonStyle + ' href="' + link + '">' + name + '</a>';
            }
            let fromID = "";

            /*            if (undefined !== msg.selected) {
                            fromID = "";
                        }
            */


            if (p) {

if (msg.content !== "!dialog --help"){

                let args = msg.content.split(" --")

                //let fromID = "";

                let toID = "";
                let toName = "";
                let messageType = "quote";
                let theMessage = "";

                args.forEach(arg => {


                    switch (true) {
                        case (arg.substring(0, 3) === "id|") && isID(arg.split("|")[1]):
                            fromID = arg.split("|")[1];
                            //log("fromID is " + fromID);
                            break;

                        case arg.substring(0, 3) === "to|" && isID(arg.split("|")[1]):
                            toID = arg.split("|")[1];
                            toName = getObj
                            //log("toID is " + toID);
                            break;

                        case arg.substring(0, 5) === "type|" && undefined !== arg.split("|")[1].match(/ooc|whisper|emote|quote/g):
                            messageType = arg.split("|")[1];
                            //log("messageType is " + messageType);
                            break;

                        case arg === "!dialog":
                            theMessage = "";
                            //log("Message is " + theMessage);

                            break;
                        default:
                            theMessage = arg;
                            //log("Message is " + theMessage);
                    }
                    //If there is a recipient, it must be a whisper
                    if (toID !== "") {
                        messageType = "whisper"
                    }

                });
                

                    
                if (fromID !== "") {
                    let t = findObjs({
                        type: 'graphic',
                        id: fromID
                    })[0];
                    
                    
                    
                 if (toID !== "") {
                    let tt = findObjs({
                        type: 'graphic',
                        id: toID
                    })[0];
                     toName = tt.get("name")
                    } else {
                        toName = "whispered: "
                 }
                    
                    if (undefined ===fromID || fromID ===""){fromID = t.get("_id")}
                    //log("toName is " + toName);
                    //log("tokenName is " + t.get("name"));


                    if (t.get('controlledby').includes(p.get('_id')) || playerIsGM(p.get('_id')) || t.get('controlledby') === 'all') {
                        /*
                                                if (msg.content.split(" --")[1]) {
                                                    theMessage = msg.content.split(" --")[1];
                                                } else {
                                                    theMessage = "says nothing."
                                                }
                                                */

                        if (undefined === theMessage) {
                            theMessage = "says nothing."
                        }
                        //clean up the message
                        theMessage = theMessage
                            .replace(/(\[.*?\])(\(.*?\))+/g, "$2$1")
                            .replace(/(\()+/g, "<a style =" + buttonStyle + " href = '")
                            .replace(/(\)\[)+/g, "'>")
                            .replace(/(\])+/g, "</a>")
                            .replace(/\/n/g, "<BR>")
                            .replace(/Q{/g, '?{')
                            .replace(/A{/g, '&#64;{');




                        if (t) {
                            let tokenImage = t.get('imgsrc');
                            let tokenName = t.get('name');
                            let tokenID = t.get('_id');
                            //                                            let button1 = `<BR><a style = 'position: relative; left: 0; bottom: 0; border: 0px none; border-radius: 0px 0px 0px 2px; background-color: #372d16; width:24%; text-align: center; font-size: 0.85em; font-family: sans-serif; font-style: normal; font-weight: normal; color: #fff; padding: 0px; display: inline-block !important' href=''>EMOTE</a>`;
                            //                                            let button2 = `<BR><a style = 'position: relative; left: 25%; bottom: 0; border: 0px none; border-radius: 0px 0px 0px 2px; background-color: #372d16; width:24%; text-align: center; font-size: 0.85em; font-family: sans-serif; font-style: normal; font-weight: normal; color: #fff; padding: 0px; display: inline-block !important' href=''>OOC</a>`;
                            let button1 = `<a style = 'border: 0px none; border-radius: 0px 0px 0px 2px; background-color: #5b4b24; width:23%; text-align: center; font-size: 0.85em; font-family: sans-serif; font-style: normal; font-weight: normal; color: #fff; padding: 0px; display: inline-block !important' href=''>EMOTE</a> `;
                            let button2 = `<a style = 'border: 0px none; border-radius: 0px 0px 0px 2px; background-color: #5b4b24; width:23%; text-align: center; font-size: 0.85em; font-family: sans-serif; font-style: normal; font-weight: normal; color: #fff; padding: 0px; display: inline-block !important' href=''>OOC</a> `;
                            let button3 = `<a style = 'border: 0px none; border-radius: 0px 0px 0px 2px; background-color: #5b4b24; width:23%; text-align: center; font-size: 0.85em; font-family: sans-serif; font-style: normal; font-weight: normal; color: #fff; padding: 0px; display: inline-block !important' href=''>WHISPER</a> `;
                            let button4 = `<a style = 'border: 0px none; border-radius: 0px 0px 0px 2px; background-color: #5b4b24; width:23%; text-align: center; font-size: 0.85em; font-family: sans-serif; font-style: normal; font-weight: normal; color: #fff; padding: 0px; display: inline-block !important' href=''>QUOTE</a>`;


let emoteCommand = `!dialog --id|${fromID} --type|emote --?{Emote|Emote}`;
let oocCommand = `!dialog --id|${fromID} --type|ooc --?{Out of Character|ooc}`;
let whisperCommand = `!dialog --id|${fromID} --to|&#64;&#123;selected|token_id&#125; --type|whisper --?{Whisper|Whisper}`;
let quoteCommand = `!dialog --id|${fromID} --type|quote --?{Speech|speech}`;



                            switch (messageType) {
                                case "quote":
                                    box = openQuoteBox;
                                    messageStyle = quoteStyle
                                    button1 = makeButton("EMOTE", emoteCommand, quoteButtonStyle);
                                    button2 = makeButton("OOC", oocCommand, quoteButtonStyle);
                                    button3 = makeButton("WHISPER", whisperCommand, quoteButtonStyle);
                                    button4 = makeButton("QUOTE", quoteCommand, quoteButtonStyle);
                                    repeatCode = `!dialog --id|${fromID} --?{Input Dialog|Speech}`
                                    break;

                                case "whisper":
                                    box = openWhisperBox;
                                    messageStyle = whisperStyle 
                                    button1 = makeButton("EMOTE", emoteCommand, whisperButtonStyle);
                                    button2 = makeButton("OOC", oocCommand, whisperButtonStyle);
                                    button3 = makeButton("WHISPER", whisperCommand, whisperButtonStyle);
                                    button4 = makeButton("QUOTE", quoteCommand, whisperButtonStyle);
                                    repeatCode = `!dialog --id|${fromID} --to|${toID} --?{Input Dialog|Speech}`;
                                    theMessage = "<span style='font-size: .8em; color: #ccc !important'>to "+toName+":</span><BR>" + theMessage
                                    break;
                                case "ooc":
                                    box = openoocBox;
                                    messageStyle = oocStyle
                                    button1 = makeButton("EMOTE", emoteCommand, oocButtonStyle);
                                    button2 = makeButton("OOC", oocCommand, oocButtonStyle);
                                    button3 = makeButton("WHISPER", whisperCommand, oocButtonStyle);
                                    button4 = makeButton("QUOTE", quoteCommand, oocButtonStyle);
                                    repeatCode = `!dialog --id|${fromID} --type|ooc --?{Input Dialog|Speech}`
                                    break;
                                case "emote":
                                    box = openEmoteBox;
                                    messageStyle = emoteStyle
                                    button1 = makeButton("EMOTE", emoteCommand, emoteButtonStyle);
                                    button2 = makeButton("OOC", oocCommand, emoteButtonStyle);
                                    button3 = makeButton("WHISPER", whisperCommand, emoteButtonStyle);
                                    button4 = makeButton("QUOTE", quoteCommand, emoteButtonStyle);
                                    repeatCode = `!dialog --id|${fromID} --type|emote --?{Input Dialog|Speech}`
                                    theMessage = t.get("name") + " " + theMessage
                                    break;
                                default:
                                    box = openQuoteBox;
                                    messageStyle = quoteStyle
                                    button1 = makeButton("EMOTE", emoteCommand, quoteButtonStyle);
                                    button2 = makeButton("OOC", oocCommand, quoteButtonStyle);
                                    button3 = makeButton("WHISPER", whisperCommand, quoteButtonStyle);
                                    button4 = makeButton("QUOTE", quoteCommand, quoteButtonStyle);
                                    repeatCode = `!dialog --id|${fromID} --?{Input Dialog|Speech}`
                                    ;
                            }
                            //Default buttons


                            //Quote Style


                            //Whisper Style
                            let buttonHolder = `<p><div style = 'bottom: -10px; border: 0px none;  border-top: 1px solid rgba(0,0,0,0.1); border-radius: 0px 0px 0px 2px;  align:center; width:100%%; text-align: center; font-size: 0.85em; font-family: sans-serif; font-style: normal; font-weight: normal; color: #fff; padding: 0px; display: inline-block !important'>${button1}${button2}${button4}</div></p>`

                            sendChat(tokenName, "" + box + imageFormat(tokenImage, tokenID) + messageFormat(theMessage) + buttonHolder + closeBox);
                        } else {
                            sendChat('', `/w gm No character found for ID <b>${a[1]}</b>!`);
                        }

                    } else {
                        sendChat('', `/w ${p.get('_displayname')} You do not control this character.`);
                    }

                } else {
                    sendChat('', `/w ${p.get('_displayname')} You must specify a token ID of a character you control.`);
                }
            } else {
                                                        sendChat('Dialog', helpText);

            }

        }

        }
    });
});
