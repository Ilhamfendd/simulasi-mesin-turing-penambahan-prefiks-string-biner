document.getElementById("startButton").addEventListener("click", () => {
  const prefix = document.getElementById("prefix").value.trim();
  const inputString = document.getElementById("inputString").value.trim();

  // Validasi input
  if (!/^[01]+$/.test(prefix) || !/^[01]+$/.test(inputString)) {
    alert("Masukkan hanya angka biner (0 atau 1)");
    return;
  }

  // Gabungkan prefiks dan string biner
  const tapeString = inputString.split("");
  const prefiks = prefix.split("");

  // Reset status dan tape
  document.getElementById("state").innerText = "Status: Memulai proses...";
  document.getElementById("tape").innerHTML = "";

  // Tampilkan tape
  let tape = "";
  prefiks.forEach((bit) => {
    tape += `<div class="cell">${bit}</div>`;
  });
  tape += '<div class="cell empty"></div>'; // Ruang kosong untuk memisahkan prefiks dan string biner
  tapeString.forEach((bit) => {
    tape += `<div class="cell">${bit}</div>`;
  });
  document.getElementById("tape").innerHTML = tape;

  // Simulasi Mesin Turing
  let currentTape = [...tapeString];
  let head = 0;
  let state = "q0"; // State awal
  let step = 0;

  // Proses mesin Turing
  let interval = setInterval(() => {
    // Update posisi kepala dan tape
    const tapeElement = document.getElementById("tape");
    tapeElement.innerHTML = "";
    currentTape.forEach((bit, index) => {
      let cellClass = index === head ? "cell active" : "cell";
      tapeElement.innerHTML += `<div class="${cellClass}">${bit}</div>`;
    });

    if (step < prefiks.length) {
      // Menambahkan bit dari prefiks ke depan satu per satu
      currentTape.unshift(prefiks[step]); // Menambahkan bit ke depan pita
      head = 0; // Kepala selalu di awal
      step++;
      state = "q0";
    } else if (step >= prefiks.length) {
      document.getElementById("state").innerText = "Status: Proses selesai!";
      clearInterval(interval);
    }
  }, 1000);
});
