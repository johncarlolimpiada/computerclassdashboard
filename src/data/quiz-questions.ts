export interface QuizQuestion {
  question: string
  choices: string[]
  answer: number // index of correct choice
}

const questions: QuizQuestion[] = [
  // ── TECH / COMPUTER VOCABULARY ──────────────────────────────────────────────
  {
    question: 'What is a "browser"?',
    choices: ['A program used to visit websites', 'A type of printer', 'A storage device', 'A keyboard shortcut'],
    answer: 0,
  },
  {
    question: 'What does "download" mean?',
    choices: ['To send a file to the internet', 'To get a file from the internet to your device', 'To delete a file', 'To share a file with others'],
    answer: 1,
  },
  {
    question: 'What does "upload" mean?',
    choices: ['To receive a file from a friend', 'To delete a file from your device', 'To send a file from your device to the internet', 'To copy a file on your device'],
    answer: 2,
  },
  {
    question: 'What is a "cursor" on a computer?',
    choices: ['A type of keyboard', 'A storage device', 'A printer setting', 'The moving pointer you see on your screen'],
    answer: 3,
  },
  {
    question: 'What is a "folder" on a computer?',
    choices: ['A place used to organize and store files', 'A type of software program', 'A screen brightness setting', 'A special keyboard key'],
    answer: 0,
  },
  {
    question: 'In computing, what does "save" mean?',
    choices: ['To print your work on paper', 'To keep your work so it is not lost', 'To share your work online', 'To close your file immediately'],
    answer: 1,
  },
  {
    question: 'What is a "password"?',
    choices: ['A type of keyboard layout', 'A screen saver image', 'A secret code used to access your account', 'A computer shortcut key'],
    answer: 2,
  },
  {
    question: 'What does "delete" mean in computing?',
    choices: ['To copy something', 'To move something to a new folder', 'To rename a file', 'To permanently remove a file or text'],
    answer: 3,
  },
  {
    question: 'What is a "username"?',
    choices: ['The name you use to log in to an account', 'A type of email address format', 'A computer program name', 'A network connection setting'],
    answer: 0,
  },
  {
    question: 'What is "Wi-Fi"?',
    choices: ['A type of desktop computer', 'A wireless internet connection', 'A keyboard shortcut combination', 'A portable storage device'],
    answer: 1,
  },
  {
    question: 'What is a "tab" in a web browser?',
    choices: ['A special keyboard key', 'A folder for saving bookmarks', 'A separate page open inside the same browser window', 'A screen display setting'],
    answer: 2,
  },
  {
    question: 'What does "copy and paste" mean?',
    choices: ['To move a file to the trash', 'To rename a file or folder', 'To change a file\'s format', 'To duplicate something and place it somewhere else'],
    answer: 3,
  },
  {
    question: 'What is a "screenshot"?',
    choices: ['A picture captured of your screen', 'A type of photo filter effect', 'A special camera setting', 'A short video recording'],
    answer: 0,
  },
  {
    question: 'What is "software"?',
    choices: ['The physical screen of a computer', 'Programs that run on a computer', 'The keyboard and mouse together', 'The battery inside a laptop'],
    answer: 1,
  },
  {
    question: 'What is "hardware"?',
    choices: ['Programs installed on a computer', 'Settings stored inside a computer', 'The physical parts of a computer', 'Files saved on a computer'],
    answer: 2,
  },
  {
    question: 'What is a "keyboard shortcut"?',
    choices: ['A small travel-size keyboard', 'A broken or missing key', 'A cracked keyboard screen', 'Keys pressed together to do something quickly'],
    answer: 3,
  },
  {
    question: 'What does "refresh" mean in a web browser?',
    choices: ['To reload the current webpage', 'To open a new browser window', 'To clear your browsing history', 'To zoom into the page'],
    answer: 0,
  },
  {
    question: 'What is a "search engine"?',
    choices: ['A vehicle engine in a video game', 'A tool used to find information on the internet', 'A type of browser plugin', 'A computer cooling fan'],
    answer: 1,
  },
  {
    question: 'What is an "attachment" in an email?',
    choices: ['A type of email account provider', 'The subject line of an email', 'A file that is added to an email', 'A special folder for emails'],
    answer: 2,
  },
  {
    question: 'What is a "hyperlink"?',
    choices: ['A very fast internet connection', 'A type of computer virus', 'A very bright screen setting', 'Clickable text or image that takes you to another page'],
    answer: 3,
  },
  {
    question: 'What does "log in" mean?',
    choices: ['To enter your details to access an account', 'To turn off your computer', 'To clear your browser history', 'To update your software'],
    answer: 0,
  },
  {
    question: 'What does "log out" mean?',
    choices: ['To turn your computer on', 'To sign out of your account', 'To delete your account', 'To change your password'],
    answer: 1,
  },
  {
    question: 'What is a "notification" on a device?',
    choices: ['A type of computer virus', 'A broken internet connection warning', 'An alert or message from an app or website', 'A new keyboard setting'],
    answer: 2,
  },
  {
    question: 'What is "cloud storage"?',
    choices: ['A type of weather tracking app', 'A cooling system for computers', 'A hard drive used only for gaming', 'Saving files on the internet instead of your device'],
    answer: 3,
  },
  {
    question: 'What is a "virus" in computing?',
    choices: ['Harmful software that can damage your device', 'A type of antivirus application', 'A popular computer game', 'A useful keyboard shortcut'],
    answer: 0,
  },
  {
    question: 'What does "zoom in" mean on a screen?',
    choices: ['To make the screen darker', 'To make something appear larger on screen', 'To take a screenshot quickly', 'To open a video call application'],
    answer: 1,
  },
  {
    question: 'What is a "network" in computing?',
    choices: ['A website made for gamers', 'A type of video cable connector', 'A group of computers connected together', 'A type of browser plugin'],
    answer: 2,
  },
  {
    question: 'What is a "server" in computing?',
    choices: ['A restaurant worker character in a game', 'A special type of keyboard', 'A stand for holding a monitor', 'A computer that provides data or services to other computers'],
    answer: 3,
  },
  {
    question: 'What is an "app"?',
    choices: ['A program designed for a specific purpose', 'A type of hardware device', 'A keyboard shortcut menu', 'A browser display setting'],
    answer: 0,
  },
  {
    question: 'What does "install" mean in computing?',
    choices: ['To fix a broken program', 'To add a program onto your computer', 'To delete a program', 'To rename a program'],
    answer: 1,
  },
  {
    question: 'What does "uninstall" mean?',
    choices: ['To install a new program', 'To update an existing program', 'To remove a program from your computer', 'To restart a program'],
    answer: 2,
  },
  {
    question: 'What is the "desktop" on a computer?',
    choices: ['A type of portable laptop', 'A photo editing program', 'A cloud backup service', 'The main screen you see when your computer starts'],
    answer: 3,
  },
  {
    question: 'What is a "laptop"?',
    choices: ['A portable computer you can carry with you', 'A type of flat touchscreen device', 'A type of smart television', 'A very large desktop computer'],
    answer: 0,
  },
  {
    question: 'In technology, what is a "tablet"?',
    choices: ['A laptop with a very large screen', 'A flat, portable touchscreen computer', 'A type of gaming console', 'A wireless keyboard device'],
    answer: 1,
  },
  {
    question: 'What is a "charger"?',
    choices: ['A type of removable battery', 'A wireless speaker device', 'A device that gives electrical power to a battery', 'A type of storage device'],
    answer: 2,
  },
  {
    question: 'What is "storage" in computing?',
    choices: ['The computer\'s cooling system', 'The screen\'s brightness level', 'The internet connection speed', 'The space available on a device to save files and programs'],
    answer: 3,
  },
  {
    question: 'What is a "processor" (CPU)?',
    choices: ['The "brain" of the computer that runs programs', 'The memory chip that stores your files', 'The battery that powers the computer', 'The wireless chip inside a computer'],
    answer: 0,
  },
  {
    question: 'What is "RAM"?',
    choices: ['A type of long-term storage device', 'Memory that helps a computer run programs quickly', 'The main battery of a computer', 'A type of processor chip'],
    answer: 1,
  },
  {
    question: 'What is a "URL"?',
    choices: ['A type of computer virus', 'A keyboard shortcut command', 'The address of a website on the internet', 'A type of internet connection'],
    answer: 2,
  },
  {
    question: 'What is "spam" in computing?',
    choices: ['A popular computer game', 'A special type of keyboard', 'A browser display setting', 'Unwanted junk messages, usually sent by email'],
    answer: 3,
  },
  {
    question: 'What is a "firewall"?',
    choices: ['Software that protects your computer from online threats', 'A program used to create presentations', 'A decorative screen saver', 'A type of fast internet connection'],
    answer: 0,
  },
  {
    question: 'What does "encrypt" mean?',
    choices: ['To permanently delete data', 'To convert data into a secret code to protect it', 'To share data with many people', 'To compress data into a smaller file'],
    answer: 1,
  },
  {
    question: 'What is "phishing"?',
    choices: ['A fishing mini-game on a computer', 'A type of antivirus protection', 'A trick used to steal your personal information online', 'A useful keyboard shortcut combination'],
    answer: 2,
  },
  {
    question: 'What is a "spreadsheet" program?',
    choices: ['A program for making slideshows', 'A device used to print on large paper', 'A screen size adjustment setting', 'A program that organizes data in rows and columns'],
    answer: 3,
  },
  {
    question: 'What is a "presentation" in software?',
    choices: ['A set of slides used to show information to an audience', 'A type of spreadsheet document', 'A program used to edit photos', 'A long document used for writing essays'],
    answer: 0,
  },
  {
    question: 'What does "format" mean when editing a document?',
    choices: ['To print the document on paper', 'To set the style or layout of a document', 'To share the document online with others', 'To delete part of a document'],
    answer: 1,
  },
  {
    question: 'What is a "template" in software?',
    choices: ['A type of software virus', 'A completely new blank document', 'A pre-made design you can customize for your own use', 'An automatic backup of your document'],
    answer: 2,
  },
  {
    question: 'What does "drag and drop" mean?',
    choices: ['Using two fingers on a touchscreen to zoom', 'Pressing and holding a key combination', 'Clicking while typing at the same time', 'Moving something on screen by clicking and pulling it to a new place'],
    answer: 3,
  },
  {
    question: 'What is a "touchscreen"?',
    choices: ['A screen you can control by touching it with your finger', 'A special type of printer screen', 'A very high-resolution monitor', 'A screen used only for video calls'],
    answer: 0,
  },
  {
    question: 'What is "Bluetooth"?',
    choices: ['A type of wired internet connection', 'Wireless technology for connecting nearby devices', 'A screen brightness adjustment mode', 'A harmful type of computer virus'],
    answer: 1,
  },
  {
    question: 'What does "reboot" mean?',
    choices: ['To update a program to a new version', 'To install brand new software', 'To restart your computer', 'To change your account password'],
    answer: 2,
  },
  {
    question: 'What is a "pixel"?',
    choices: ['A type of social media photo filter', 'A screen display setting option', 'A photo editing graphics program', 'A tiny dot that makes up images on a screen'],
    answer: 3,
  },
  {
    question: 'What is the "resolution" of a screen?',
    choices: ['The number of pixels that make up the display', 'The brightness level of the screen', 'The physical size of the screen in inches', 'The speed at which the screen refreshes'],
    answer: 0,
  },
  {
    question: 'What is a "podcast"?',
    choices: ['A type of online video game', 'An audio show you can listen to online', 'A type of social media post format', 'A program used for video editing'],
    answer: 1,
  },
  {
    question: 'What is a "profile" on a website?',
    choices: ['A special website color theme', 'A privacy and security setting', 'A page showing your personal information on a website', 'A type of browser extension'],
    answer: 2,
  },
  {
    question: 'What does "stream" mean online?',
    choices: ['To download a video to watch later offline', 'To share a video file with a friend', 'To record your computer screen', 'To watch or listen to media in real time without downloading it'],
    answer: 3,
  },
  {
    question: 'What is a "subscription" for an online service?',
    choices: ['Paying regularly (monthly or yearly) to use a service', 'A one-time purchase of a software product', 'A free trial period for a new program', 'A student discount code for software'],
    answer: 0,
  },
  {
    question: 'What is a "webcam"?',
    choices: ['A camera used only outdoors', 'A camera connected to or built into a computer for video calls', 'A type of outdoor security camera', 'A camera only found inside smartphones'],
    answer: 1,
  },
  {
    question: 'What is a "monitor"?',
    choices: ['A type of portable laptop computer', 'A portable external hard drive', 'The screen of a desktop computer', 'A device that produces sound from a computer'],
    answer: 2,
  },
  {
    question: 'What is a "printer"?',
    choices: ['A device used for scanning documents', 'A device for capturing screenshots', 'A type of wireless keyboard', 'A machine that puts text or images on paper'],
    answer: 3,
  },
  {
    question: 'What is a "scanner"?',
    choices: ['A device that converts paper documents into digital files', 'A special type of photo printer', 'A monitor with a built-in camera', 'A keyboard with a fingerprint reader built in'],
    answer: 0,
  },
  {
    question: 'What does "undo" mean in software?',
    choices: ['To delete the last file you saved', 'To reverse the last action you performed', 'To repeat the last action you performed', 'To close the program without saving'],
    answer: 1,
  },
  {
    question: 'What does "redo" mean in software?',
    choices: ['To erase everything you just typed', 'To save your work a second time', 'To repeat an action you just undid', 'To close and reopen a file'],
    answer: 2,
  },
  {
    question: 'What is an "icon" on a computer screen?',
    choices: ['A special decorative font style', 'A screen resolution adjustment', 'A desktop background image', 'A small image that represents a file, folder, or program'],
    answer: 3,
  },
  {
    question: 'What does "sign up" mean on a website?',
    choices: ['To create a new account on a website', 'To log in to an existing account', 'To change your account password', 'To permanently delete your account'],
    answer: 0,
  },
  {
    question: 'What is a "database"?',
    choices: ['A type of internet browser', 'An organized collection of digital information', 'A complete backup copy of your computer', 'A type of computer network'],
    answer: 1,
  },
  {
    question: 'What is "coding"?',
    choices: ['Sending encrypted messages to others', 'Organizing files neatly inside folders', 'Writing instructions for a computer using a programming language', 'Designing images and graphics for websites'],
    answer: 2,
  },
  {
    question: 'What is an "algorithm"?',
    choices: ['A harmful type of computer virus', 'A social media post format', 'A screen brightness setting', 'A set of steps used to solve a problem'],
    answer: 3,
  },
  {
    question: 'What is a "bug" in software?',
    choices: ['An error or mistake in a computer program', 'A harmful physical insect in a computer', 'A different name for a computer virus', 'A corrupted or missing file'],
    answer: 0,
  },
  {
    question: 'What does "debug" mean?',
    choices: ['To install completely new software', 'To find and fix errors in a computer program', 'To delete all old and unused files', 'To restart a program that has stopped working'],
    answer: 1,
  },
  {
    question: 'What is a "menu" in software?',
    choices: ['A list of food options in a game', 'A screen brightness control', 'A list of options or features available in a program', 'A type of keyboard shortcut combination'],
    answer: 2,
  },
  {
    question: 'What is "online chat"?',
    choices: ['A video call with many people at once', 'A message sent by email', 'A post shared on social media', 'A real-time text conversation with someone online'],
    answer: 3,
  },
  {
    question: 'What is a "microphone" used for with a computer?',
    choices: ['To capture or record sound and voice', 'To display images and video on screen', 'A wireless speaker for playing audio', 'A special type of camera attachment'],
    answer: 0,
  },
  {
    question: 'What is a "speaker" connected to a computer?',
    choices: ['A device used to take photographs', 'A device that produces audio output from your computer', 'A device used to record video', 'A type of microphone for voice input'],
    answer: 1,
  },
  {
    question: 'What is an "emoji"?',
    choices: ['A special decorative computer font', 'A secret code hidden inside a message', 'A keyboard language layout', 'A small image used to express feelings in messages'],
    answer: 3,
  },

  // ── GENERAL ENGLISH VOCABULARY ───────────────────────────────────────────────
  {
    question: 'What does "enormous" mean?',
    choices: ['Very small in size', 'Very fast in speed', 'Very old in age', 'Very large in size'],
    answer: 3,
  },
  {
    question: 'What does "ancient" mean?',
    choices: ['Very old', 'Very rare', 'Very slow', 'Very valuable'],
    answer: 0,
  },
  {
    question: 'What does "frequently" mean?',
    choices: ['Rarely', 'Often', 'Quickly', 'Carefully'],
    answer: 1,
  },
  {
    question: 'What does "purchase" mean?',
    choices: ['To sell something', 'To lose something', 'To buy something', 'To find something'],
    answer: 2,
  },
  {
    question: 'What does "preserve" mean?',
    choices: ['To destroy something', 'To change something completely', 'To share something with others', 'To keep something safe or protected'],
    answer: 3,
  },
  {
    question: 'What does "demonstrate" mean?',
    choices: ['To show how something works', 'To hide something from others', 'To write about something in detail', 'To listen carefully to something'],
    answer: 0,
  },
  {
    question: 'What does "collaborate" mean?',
    choices: ['To compete against others', 'To work together with others', 'To argue with others', 'To ignore others around you'],
    answer: 1,
  },
  {
    question: 'What does "summarize" mean?',
    choices: ['To memorize every detail of something', 'To translate something into another language', 'To give a short version of the main points', 'To repeat something word for word'],
    answer: 2,
  },
  {
    question: 'What does "accurate" mean?',
    choices: ['Very fast', 'Very difficult', 'Very expensive', 'Correct and free from mistakes'],
    answer: 3,
  },
  {
    question: 'What does "efficient" mean?',
    choices: ['Getting a good result without wasting time or energy', 'Doing something very slowly and carefully', 'Making many mistakes while working', 'Using far too many resources'],
    answer: 0,
  },
  {
    question: 'What does "recommend" mean?',
    choices: ['To warn someone about danger', 'To suggest something as good or useful', 'To disagree with someone\'s choice', 'To complain about something'],
    answer: 1,
  },
  {
    question: 'What does "communicate" mean?',
    choices: ['To travel to many different places', 'To compete against others', 'To share information or ideas with others', 'To avoid talking to others'],
    answer: 2,
  },
  {
    question: 'What does "distribute" mean?',
    choices: ['To collect things from many people', 'To throw things away', 'To hide things in secret places', 'To give something out to many people'],
    answer: 3,
  },
  {
    question: 'What does "analyze" mean?',
    choices: ['To study something carefully in order to understand it', 'To create something new from nothing', 'To destroy something completely', 'To copy something exactly'],
    answer: 0,
  },
  {
    question: 'What does "evaluate" mean?',
    choices: ['To build or create something from scratch', 'To judge the quality or value of something', 'To completely ignore something', 'To describe something very quickly'],
    answer: 1,
  },
  {
    question: 'What does "estimate" mean?',
    choices: ['To measure something very precisely', 'To calculate the exact and perfect answer', 'To make a rough guess or calculation', 'To record something in careful detail'],
    answer: 2,
  },
  {
    question: 'What does "expand" mean?',
    choices: ['To make something smaller', 'To keep something exactly the same', 'To remove something completely', 'To make something bigger or wider'],
    answer: 3,
  },
  {
    question: 'What does "generate" mean?',
    choices: ['To produce or create something', 'To stop something from happening', 'To destroy something', 'To hide something away'],
    answer: 0,
  },
  {
    question: 'What does "identify" mean?',
    choices: ['To misunderstand something', 'To recognize and name what something is', 'To build or create something new', 'To completely lose track of something'],
    answer: 1,
  },
  {
    question: 'What does "implement" mean?',
    choices: ['To plan something without taking action', 'To only think about an idea', 'To put a plan or idea into action', 'To cancel or give up on a plan'],
    answer: 2,
  },
  {
    question: 'What does "improve" mean?',
    choices: ['To make something worse', 'To keep something exactly the same', 'To completely destroy something', 'To make something better'],
    answer: 3,
  },
  {
    question: 'What does "increase" mean?',
    choices: ['To become larger in number or amount', 'To become smaller', 'To stay the same', 'To disappear completely'],
    answer: 0,
  },
  {
    question: 'What does "indicate" mean?',
    choices: ['To hide important information', 'To show or point to something', 'To erase something completely', 'To confuse someone on purpose'],
    answer: 1,
  },
  {
    question: 'What does "influence" mean?',
    choices: ['To control someone completely', 'To have absolutely no effect on someone', 'To have an effect on someone or something', 'To secretly copy someone else'],
    answer: 2,
  },
  {
    question: 'What does "obtain" mean?',
    choices: ['To lose something important', 'To destroy something', 'To give something away', 'To get or receive something'],
    answer: 3,
  },
  {
    question: 'What does "occur" mean?',
    choices: ['To happen', 'To prevent something', 'To plan something carefully', 'To forget something important'],
    answer: 0,
  },
  {
    question: 'What does "participate" mean?',
    choices: ['To watch others without joining in', 'To take part in an activity or event', 'To stop an activity from happening', 'To organize an activity for others'],
    answer: 1,
  },
  {
    question: 'What does "prevent" mean?',
    choices: ['To allow something to happen freely', 'To make something happen faster', 'To stop something from happening', 'To strongly encourage something'],
    answer: 2,
  },
  {
    question: 'What does "require" mean?',
    choices: ['To prefer something over another', 'To avoid something completely', 'To gently suggest something', 'To need something'],
    answer: 3,
  },
  {
    question: 'What does "respond" mean?',
    choices: ['To reply or react to something', 'To completely ignore someone', 'To ask a brand new question', 'To forget something important'],
    answer: 0,
  },
  {
    question: 'What does "select" mean?',
    choices: ['To create something brand new', 'To choose something', 'To destroy something', 'To rename something'],
    answer: 1,
  },
  {
    question: 'What does "significant" mean?',
    choices: ['Very small or unimportant', 'Very difficult to understand', 'Important or meaningful', 'Very easy to do'],
    answer: 2,
  },
  {
    question: 'What does "solve" mean?',
    choices: ['To create a new problem', 'To completely ignore a problem', 'To make a problem worse', 'To find the answer to a problem'],
    answer: 3,
  },
  {
    question: 'What does "translate" mean?',
    choices: ['To change words from one language to another', 'To rewrite something in a different style', 'To shorten a long piece of writing', 'To check a text for spelling mistakes'],
    answer: 0,
  },
  {
    question: 'What does "benefit" mean?',
    choices: ['A very difficult challenge', 'An advantage or positive result', 'A serious problem or obstacle', 'A type of regular payment'],
    answer: 1,
  },
  {
    question: 'What does "challenge" mean?',
    choices: ['A very easy and enjoyable task', 'A reward given for good work', 'A difficult task or problem', 'A fun friendly competition'],
    answer: 2,
  },
  {
    question: 'What is a "consequence"?',
    choices: ['A plan made for the future', 'A personal opinion or belief', 'A helpful resource or tool', 'A result that comes from an action'],
    answer: 3,
  },
  {
    question: 'What does "contribute" mean?',
    choices: ['To give or add something in order to help', 'To take something away from a group', 'To suddenly leave a group', 'To compete strongly against a group'],
    answer: 0,
  },
  {
    question: 'What is a "deadline"?',
    choices: ['A funny joke shared with classmates', 'The last time or date by which something must be done', 'A holiday or day off from school', 'A brand new rule or regulation'],
    answer: 1,
  },
  {
    question: 'What does "describe" mean?',
    choices: ['To draw a detailed picture of something', 'To translate something into English', 'To explain what something is like using words', 'To measure the exact size of something'],
    answer: 2,
  },
  {
    question: 'What does "focus" mean?',
    choices: ['To avoid thinking about a topic', 'To think about many things at the same time', 'To feel confused and distracted', 'To give your full attention to one thing'],
    answer: 3,
  },
  {
    question: 'What does "hesitate" mean?',
    choices: ['To pause because you are unsure what to do', 'To act quickly and with great confidence', 'To repeat the same action many times', 'To give up on something immediately'],
    answer: 0,
  },
  {
    question: 'What does "honest" mean?',
    choices: ['Being very clever and intelligent', 'Telling the truth', 'Being very kind to everyone', 'Working very hard every day'],
    answer: 1,
  },
  {
    question: 'What does "patient" mean?',
    choices: ['Feeling very excited about something', 'Getting angry very easily', 'Able to wait calmly without getting upset', 'Feeling very tired and sleepy'],
    answer: 2,
  },
  {
    question: 'What does "confident" mean?',
    choices: ['Feeling very nervous and unsure', 'Feeling very sad about something', 'Feeling very lost and confused', 'Feeling sure and certain about yourself'],
    answer: 3,
  },
  {
    question: 'What does "curious" mean?',
    choices: ['Wanting to learn and discover more', 'Feeling very bored and uninterested', 'Being very careful and precise', 'Feeling angry about something'],
    answer: 0,
  },
  {
    question: 'What does "brave" mean?',
    choices: ['Being very quick and intelligent', 'Not being afraid to face difficult or dangerous things', 'Being very good at sports', 'Being very kind and polite to others'],
    answer: 1,
  },
  {
    question: 'What does "polite" mean?',
    choices: ['Speaking very loudly to everyone', 'Ignoring the people around you', 'Having good manners and being respectful to others', 'Being very competitive in everything'],
    answer: 2,
  },
  {
    question: 'What does "flexible" mean?',
    choices: ['Having very strong and large muscles', 'Being very strict and never changing', 'Never accepting any new ideas', 'Able to change or adapt to new situations easily'],
    answer: 3,
  },
  {
    question: 'What does "grateful" mean?',
    choices: ['Feeling thankful for something', 'Feeling completely bored', 'Feeling very angry about something', 'Feeling confused and unsure'],
    answer: 0,
  },
  {
    question: 'What does "obvious" mean?',
    choices: ['Something very difficult to notice', 'Easy to see or understand', 'Very complicated and complex', 'Completely hidden from view'],
    answer: 1,
  },
  {
    question: 'What does "necessary" mean?',
    choices: ['Something helpful but not really needed', 'Nice to have but not important', 'Something that is required and must be done', 'Something completely optional'],
    answer: 2,
  },
  {
    question: 'What does "similar" mean?',
    choices: ['Completely different from something', 'Exactly the same as something', 'Very strange or unusual', 'Almost the same as something else'],
    answer: 3,
  },
  {
    question: 'What does "original" mean?',
    choices: ['New and different, not copied from others', 'Copied directly from someone else', 'Very old and completely outdated', 'Very common and ordinary'],
    answer: 0,
  },
  {
    question: 'What does "stare" mean?',
    choices: ['To listen very carefully to something', 'To look at something for a long time without looking away', 'To touch something very gently', 'To walk somewhere very slowly'],
    answer: 1,
  },
  {
    question: 'What does "reduce" mean?',
    choices: ['To make something larger', 'To keep something exactly the same size', 'To make something smaller in amount or size', 'To multiply something many times'],
    answer: 2,
  },
  {
    question: 'What does "duplicate" mean?',
    choices: ['To completely destroy something', 'To share something with many people', 'To give something a new name', 'To make an exact copy of something'],
    answer: 3,
  },
  {
    question: 'What does "recognize" mean?',
    choices: ['To know someone or something because you have seen it before', 'To meet someone for the very first time', 'To forget something that was important', 'To pretend not to know someone'],
    answer: 0,
  },
  {
    question: 'What is a "desire"?',
    choices: ['A feeling of great boredom', 'A strong feeling of wanting something', 'A feeling of deep sadness', 'A feeling of sudden fear'],
    answer: 1,
  },
  {
    question: 'What is a "schedule"?',
    choices: ['A random list of names', 'A type of difficult homework', 'A plan that shows activities and their times', 'A report that describes past events'],
    answer: 2,
  },
  {
    question: 'What does "mistake" mean?',
    choices: ['A very clever answer', 'A completely new idea', 'A type of important rule', 'Something that was done incorrectly'],
    answer: 3,
  },
  {
    question: 'What does "practice" mean?',
    choices: ['To do something many times in order to improve at it', 'To try something just once to test it', 'To watch others do something', 'To teach a skill to someone else'],
    answer: 0,
  },
  {
    question: 'What does "review" mean?',
    choices: ['To completely ignore something you already finished', 'To look at something again carefully', 'To start something for the very first time', 'To throw something away'],
    answer: 1,
  },
  {
    question: 'What does "volunteer" mean?',
    choices: ['To do a job and expect to be paid', 'To force someone else to do something', 'To refuse to help when asked', 'To offer to do something without being paid'],
    answer: 3,
  },
  {
    question: 'What does "apologize" mean?',
    choices: ['To say sorry for something you did wrong', 'To congratulate someone on their success', 'To argue strongly with someone', 'To completely ignore someone\'s feelings'],
    answer: 0,
  },
  {
    question: 'What does "encourage" mean?',
    choices: ['To criticize someone\'s work harshly', 'To give someone confidence to try or keep going', 'To stop someone from doing something', 'To compete directly against someone'],
    answer: 1,
  },
  {
    question: 'What does "insist" mean?',
    choices: ['To immediately agree with someone', 'To quietly accept whatever is decided', 'To say firmly that something must happen', 'To politely and gently ask for something'],
    answer: 2,
  },
  {
    question: 'What does "persuade" mean?',
    choices: ['To confuse someone completely', 'To physically force someone to act', 'To trick someone with false information', 'To convince someone to do or believe something'],
    answer: 3,
  },
  {
    question: 'What does "remind" mean?',
    choices: ['To help someone remember something', 'To make someone forget something', 'To teach someone a completely new skill', 'To strongly disagree with someone'],
    answer: 0,
  },
  {
    question: 'What does "suggest" mean?',
    choices: ['To demand something very firmly', 'To offer an idea for someone else to consider', 'To refuse to help someone', 'To secretly copy someone\'s idea'],
    answer: 1,
  },
  {
    question: 'What does "admit" mean?',
    choices: ['To completely deny that something happened', 'To ignore an obvious fact', 'To agree that something is true', 'To change the facts about what happened'],
    answer: 2,
  },
  {
    question: 'What does "avoid" mean?',
    choices: ['To actively search for something', 'To find something you need', 'To warmly welcome something', 'To stay away from something on purpose'],
    answer: 3,
  },
  {
    question: 'What does "ignore" mean?',
    choices: ['To pay no attention to something on purpose', 'To study something with great care', 'To search for something carefully', 'To reply quickly to something'],
    answer: 0,
  },
  {
    question: 'What does "struggle" mean?',
    choices: ['To easily succeed at something', 'To have difficulty doing something', 'To finish something very quickly', 'To enjoy doing something very much'],
    answer: 1,
  },
  {
    question: 'What does "arrange" mean?',
    choices: ['To throw things away randomly', 'To completely ignore the order of things', 'To put things in a certain order or to organize them', 'To purposely mix everything up'],
    answer: 2,
  },
]

// ── Seeded deterministic shuffle ────────────────────────────────────────────────
function lcgNext(s: number): number {
  return ((s * 1664525 + 1013904223) & 0x7fffffff)
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr]
  let s = seed
  for (let i = result.length - 1; i > 0; i--) {
    s = lcgNext(s)
    const j = s % (i + 1)
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function getDailyQuestions(count: number): QuizQuestion[] {
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / 86400000)
  const seed = now.getFullYear() * 1000 + dayOfYear
  return seededShuffle(questions, seed).slice(0, count)
}
