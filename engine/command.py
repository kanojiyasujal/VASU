import re
import eel
import pyttsx3
import speech_recognition as sr
import time



def speak(text):
    text = str(text)
    engine = pyttsx3.init('sapi5')
    voices = engine.getProperty('voices')
    engine.setProperty('voice', voices[0].id)
    engine.setProperty('rate', 174)
    eel.DisplayMessage(text)

    engine.say(text)
    engine.runAndWait()

def takecommand():
    r = sr.Recognizer()

    with sr.Microphone() as source:
        print('Listening....')
        eel.DisplayMessage('listening....')
        r.pause_threshold = 1
        r.adjust_for_ambient_noise(source)

        audio = r.listen(source, timeout=10, phrase_time_limit=6)
    
    try:
        print('Recognizing...')
        eel.DisplayMessage('Recognizing...')
        query = r.recognize_google(audio, language='en-in')
        
        print(f"User said: {query}")
        eel.DisplayMessage(query)
        time.sleep(2)

    except Exception as e:
        return ""
    
    return query.lower()

@eel.expose
def allCommands():
    try:
        query = takecommand()
        print(query)

        if "open" in query:
            from engine.features import openCommand
            openCommand(query)
        elif "on youtube" in query:
            from engine.features import PlayYoutube
            PlayYoutube(query)
        elif "send message" in query or "phone call" in query or "video call" in query:
            from engine.features import findContact, whatsApp
            contact_no, name = findContact(query)
            if contact_no != 0:
                if "send message" in query:
                    speak("what message to send")
                    message = takecommand()
                    whatsApp(contact_no, message, 'message', name)
                elif "phone call" in query:
                    speak("Initiating phone call to "+name)
                    whatsApp(contact_no, '', 'call', name)
                elif "video call" in query:
                    speak("Initiating video call to "+name)
                    whatsApp(contact_no, '', 'video call', name) 
        elif query.startswith("create a bar chart of the data in"):
            from engine.features import chart_creation_file
            chart_creation_file(query)
        elif query.startswith("create a new excel file"):
            from engine.features import create_new_excel_file
            speak("Please speak the content you want to add to the Excel file:")
            content = takecommand()
            if content:
                speak("Please speak the filename for the Excel file:")
                filename = takecommand()
                if filename:
                    create_new_excel_file(filename, content)
        elif "open" in query and "excel" in query:
            from engine.features import open_excel_file
            open_command = query.split("open")[-1].strip().split("excel")[-1].strip()
            open_excel_file(filename)
        elif "move" in query:
            from engine.features import navigate
            direction = ""
            if "up" in query:
                direction = "up"
            elif "down" in query:
                direction = "down"
            elif "left" in query:                           
                direction = "left"
            elif "right" in query:
                direction = "right"
            if direction:
                navigate(direction)
            else:
                speak("Invalid move command. Please try again.")
        elif "go to" in query:
            from engine.features import go_to_cell
            cell = query.split("go to")[-1].strip()
            go_to_cell(cell)
        elif "write" in query:
            from engine.features import write_data
            data = query.split("write")[-1].strip()
            write_data(data)
        elif "delete" in query:
            from engine.features import delete_data
            delete_data()

        elif "create a new word file called" in query:
            from engine.features import create_new_word_file
            filename = query.split("create a new word file called")[-1].strip() + ".docx"
            filepath = create_new_word_file(filename)
            if filepath:
                message = "Word file '{}' created successfully and saved at: {}".format(filename, filepath)
                speak(message)
                print(message)

        

        elif "read a word file called" in query:
            from engine.features import read_word_file,speak_text
            filename = re.search(r'read a word file called (.+)', query)
            if filename:
                filename = filename.group(1).strip() + ".docx"
                content = read_word_file(filename)
                if content:
                    speak_text(content)  # Speak the content
            else:
                print("Please specify the filename of the Word file to read in the same command.")
       
            

        else:
            from engine.features import chatBot
            chatBot(query)
    except:
        speak("Error occurred.")
    eel.ShowHood()