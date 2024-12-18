// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

const o={
    option1:12,
    option2:10,
    option3:14,
    option4:14,
    
}
const error={
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    
}
const r=Object.entries(o).forEach(([key,val])=> {
    console.log(key)
    const remaining=Object.fromEntries(Object.entries(o).filter(([k,v])=>key!=k&&val==v))
    if(Object.keys(remaining).length>0){
        Object.keys(e=>error[e]="already")
    }
    console.log(remaining,"...","....err",error)
    
    
})
