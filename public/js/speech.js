function speak(text) {
    if (typeof SpeechSynthesisUtterance === 'undefined' || typeof speechSynthesis === 'undefined') {
      alert('This browser does not support speech API');
      return;
    }
  
    const message = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
  
    message.voice = voices[0];
    speechSynthesis.speak(message);
  }