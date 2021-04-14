# DIALOG 0.1

Dialog is a script that makes chat a bit more fun and easier to parse. It is token-based, either using selected and targeted tokens or specific token IDs.

`!Dialog --id|token_id --to|token_id --type|type --message`

`--id|token_id`: Required. Specifies the speaker

`--to|token_id`: Optional. If a recipient is specified, the dialog becomes a whisper.

`--type|quote|whisper|emote|ooc`: Optional. This determines the style of the dialog box to display. If not used, the script assumes an in-character quote. Whisper doesn't actually do anything, but is included as an option for making it plain that a whisper is intended. specifying a --to|token_id automatically chooses the whisper style.

`--message`: anything placed after -- that does not match one of the other tags becomes the defacto message.

**Token Image:** Clicking on the token image will repeat the last configuration. If you sent an emote, it will send another emote, propting you for the content. If you sent a whisper, it will send a whisper to the person you were whispering to. In this way, two characters who have started a whispered conversation can keep it going by just clicking on their token image in chat.
**Button Line:** There is a line of buttons at the bottom of the dialog that you can use to change the type of dialog. This will also set the token image button to repeat the dialog type.
Note about whispers: because the API cannot issue a target command, you must initiate a whisper using a macro. Once it is established, you can use the token image button.

**Sample Macros**

**Basic quote:** `!dialog --id|@{selected|token_id} --?{message|message}`

**Start a whisper:** `!dialog --id|@{selected|token_id} --@{target|token_id} --?{message|message}`

`!dialog --help`: displays this help box.


**Language**

The language feature of Dialog is based on the fact that whispers to a shared character will be seen by all players who are listed as controllers of that character. You can create a simple NPC and name it 'Dwarvish' for example and assign control of it to all players in the campaign who speak Dwarvish. While this is an old trick, Dialog makes it easier and more fun to manage language characters and to speak in the languages.

The language feature shares many similarities to the whisper function, but with this difference: no matter who is the speaker, the message is sent from the language character. This ensures that there will be no duplicate messages posted and that a language token image is included to identify the language. An announcement box will precede the dialog, indicating who the true speaker of the message is and what language they are speaking. Only the speaker of the language will see the message. Everyone else will only see the announcement, letting them know the speaker and the language, but not the content.

Any character who can see the translated message can click the "Respond" button, or click the language token image and submit a response. They will be announced as the speaker, and the process continues.


**Setting up a language character and token**

I have included a dropbox link to some basic SRD language token images. You can make your own or search the marketplace for appropriate images. I plan to have a set available shortly. The process is:

1. Create an NPC and give it the name of a language. At the bare minimum, it must have the GM listed as a controller, or the GM will not be able to read any language messages.

2. Assign a token to the language. If you wish, you can put a color value into bar 1 in standard format of #000 or #000000. The language dialog box will then display in this color. You must include the #. This color step is optional.

3. Repeat for every language in the campaign.


**Helpful Macros**
Assign control of a language to a character - For this it would be helpful to create a page with all of your language tokens together.Place the player token on that page, select it and run:

`!dialog --assign selected|character_id target|character_id`
...following the on-screen prompt to select the target language. If you have a need, you can hard code the character ids. Because of the way whispering, control and chat interact in Roll20, languages are player-based, not character based. So a player cannot have full functionality if they are playing multiple characters who all have different language lists.

Create a player language macro - You can make a macro or token action for the player to run that will provide a drop down list of all of the languages they speak and ask them what they wish to say. Simply select all the spoken languages and run:

`!dialog --macro`
The chat will give you the code to copy and paste into a macro or action. Here is an example:

`!dialog --id|?{Select a Language|Celestial,-MYE-9dZmVhBFXoAWN5Q|Elvish,-MYDyOKLJixapf-XRnk7|Dwarvish,-MYDyOFL-COUk0VBsCP2|Goblinish,-MYDyrM4qVx_p97cfY--} --to|@{selected|token_id} --type|language --?{message|message}`
Again, because of limitations in Roll20, you cannot have a dropdown with only one entry. So a character must have at least two additional languages for this to work correctly. You can always manually edit it down to:

`!dialog --id|-MYE-9dZmVhBFXoAWN5Q --to|@{selected|token_id} --type|language --?{message|message}`
If the only language the character knows is "Celestial".

**Design Considerations**
- Because Common is... common to almost all characters, I have elected not to consider it a language. Use the quote macro from above to speak in Common.
- I have not tested this for sheets other than the D&D 5th Edition by Roll20 Sheet, but I don't think there is any coding specific to that sheet. If you play with another sheet and run into issues, let me know.
- In the case of D&D, some languages are actually the name of the race. Elves speak elvish, but Orcs speak Orc. Since the language is actually a character, it is a good idea to rename such language to something like "Orcish" so the game does not become confused.
- NPCs do not need to have languages assigned. They are gm controlled and the script realizes this. The gm can decide on an ad hoc basis if an NPC can understand and respond.
- Almost all of the css that controls the appearance of the boxes, fonts and buttons is in a block of constants near the top of the script, in case anyone wants to tinker with the defaults.
