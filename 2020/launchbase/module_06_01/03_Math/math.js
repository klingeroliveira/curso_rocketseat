// callback
function printDoubleCallback(number){
    setTimeout(
      () => {
        console.log(`Callback ${number * 2}`)
      },
      Math.floor(Math.random() * 100) + 1
    )
  }

  function printAllCallback(){
    printDoubleCallback(5)
    printDoubleCallback(10)
    printDoubleCallback(22)
    printDoubleCallback(1)
    printDoubleCallback(89)
  }

//   printAllCallback()


// Promisse
function numberDoublePromisse(number){
  return new Promise((resolve) => {
    setTimeout( () => {
        resolve(number * 2)
      }, Math.floor(Math.random() * 100) + 1
    )
  })
}

function printNumberPromisse(number){
  numberDoublePromisse(number)
  .then((result) => {
    console.log(`Promisse Number ${number}, double ${result}`)
  })
}

function printAllPromisse(){
  printNumberPromisse(5)
  printNumberPromisse(10)
  printNumberPromisse(22)
  printNumberPromisse(1)
  printNumberPromisse(89)
}

//printAllPromisse()


// Async_Await
function numberDoubleAsync_Await(number){
  return new Promise((resolve) => {
    setTimeout( () => {
        resolve(number * 2)
      }, Math.floor(Math.random() * 100) + 1
    )
  })
}

async function printNumberAsync_Await(number){
    const numDouble = await numberDoubleAsync_Await(number)
    console.log(`Async_Await Number ${number}, double ${numDouble}`)
}

async function printAllAsync_Await(){
  await printNumberAsync_Await(5)
  await printNumberAsync_Await(10)
  await printNumberAsync_Await(22)
  await printNumberAsync_Await(1)
  await printNumberAsync_Await(89)
}

//printAllAsync_Await()


// Promise Async_Await Encadeado
function numberDoubleEncadeado(number, result){
  return new Promise((resolve) => {
    setTimeout( () => {
        resolve((number * 2) + result)
        //console.log(`Encadeado Number ${number}, double ${(number * 2) + result}`)
      }, Math.floor(Math.random() * 100) + 1
    )
  })
}

async function printAllEncadeado(){
  let result = 0
  result = await numberDoubleEncadeado(5, 0)
  console.log(result)
  result = await numberDoubleEncadeado(10, result)
  console.log(result)
  result = await numberDoubleEncadeado(22, result)
  console.log(result)
  result = await numberDoubleEncadeado(1, result)
  console.log(result)
  result = await numberDoubleEncadeado(89, result)
  console.log(result)
}

printAllEncadeado()