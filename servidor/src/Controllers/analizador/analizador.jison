%{
//CODIGO JS
const ListaErrores= require('../indexController');
const errores= require('./Excepciones/Errores');
const Tipo=require('./simbolo/Tipo')
//expresiones
const Nativo=require('./expresiones/Nativo')
const Aritmeticas=require('./expresiones/Aritmeticas')
const Relacionales=require('./expresiones/Relacionales')
const Logicas=require('./expresiones/Logicas')
const AccesoVar=require('./expresiones/AccesoVar')
const AccesoVec=require('./expresiones/AccesoVec')
const FuncNativas=require('./expresiones/FuncNativas')
const Casteo=require('./expresiones/Casteo')
//instrucciones
const Print=require('./instrucciones/Print')
const PrintLn=require('./instrucciones/Println')
const DeclaracionVar=require('./instrucciones/DeclaracionVar')
const DeclaracionArray1=require('./instrucciones/DeclaracionArray1')
const DeclaracionArray2=require('./instrucciones/DeclaracionArray2')
const IncDec=require('./instrucciones/IncDec')
const ModVec=require('./instrucciones/ModVec')
const ModVar=require('./instrucciones/ModVar')
const BreakContinue=require('./instrucciones/BreakContinue')
const If=require('./instrucciones/If')
const Ternario=require('./instrucciones/Ternario')
const While=require('./instrucciones/While')
const For=require('./instrucciones/For')
const DoWhile=require('./instrucciones/DoWhile')
const CaseDef=require('./instrucciones/CaseDef')
const Switch=require('./instrucciones/Switch')
const Metodo=require('./instrucciones/Metodo')
const Funcion=require('./instrucciones/Funcion')
const Return=require('./instrucciones/Return')
const Run=require('./instrucciones/Run')
const Llamada=require('./instrucciones/Llamada')



%}

%lex
%options case-insensitive 
%%
//palabras reservadas
"int"               return 'INT';
"double"            return 'DOUBLE';
"boolean"           return 'BOOL';
"char"              return 'CHAR';
"string"            return 'STRING';
"new"               return 'NEW';
"if"                return 'IF';
"else"              return 'ELSE';
"switch"            return 'SWITCH';
"case"              return 'CASE';
"break"             return 'BREAK';
"default"           return 'DEFAULT';
"while"             return 'WHILE';
"for"               return 'FOR';
"do"                return 'DO';
"continue"          return 'CONTINUE';
"return"            return 'RETURN';
"print"             return 'PRINT'
"println"           return 'PRINTLN';
"tolower"           return 'TOLOWER';
"toupper"           return 'TOUPPER';
"round"             return 'ROUND';
"length"            return 'LENGTH';
"typeof"            return 'TYPEOF';
"tostring"          return 'TOSTRING';
"tochararray"       return 'TOCHARARRAY';
"main"               return 'RUN';
"null"              return 'NULL';
"true"              return 'TRUE';
"false"             return 'FALSE';
"void"              return 'VOID';


//cometarios
(\/\/.*[^\n])     {}
(\/\*([^*/]|[^*]\/|\*[^/])*\*\/)    {}


"=="                return 'EQUALS';
"!="                return 'NOTEQUAL';
"<="                return 'MENOREQ';
">="                return 'MAYOREQ';
"||"                return 'OR';
"&&"                return 'AND';
"++"                return 'INCREMENT';
"--"                return 'DECREMENT';
"/"                 return 'DIV';
"^"                 return 'POW'
"%"                 return 'MOD';
"="                 return 'IGUAL';
"!"                 return 'NOT';
"<"                 return 'MENOR';
">"                 return 'MAYOR';
"?"                 return 'TERNARIO';
"("                 return 'PAR1';
")"                 return 'PAR2';
"{"                 return 'LLAVE1';
"}"                 return 'LLAVE2';
"["                 return 'COR1';
"]"                 return 'COR2';
":"                 return 'DOSPUNTOS';
";"                 return 'PUNTOCOMA';
","                 return 'COMA';
//simbolos
"+"                 return 'MAS';
"-"                 return 'MENOS';
"*"                 return 'MULT';


//adicionales
[a-z][a-z0-9_]*     return 'ID';
[0-9]+"."[0-9]+     return 'DECIMAL';
[0-9]+              return 'ENTERO';
[\']([^\t\'\"\n]|(\\\")|(\\n)|(\\\')|(\\t)|(\\\\))?[\']         {yytext=yytext.substr(1,yyleng-2); return 'CARACTER';}
[\"]((\\\")|[^\"\n])*[\"]       {yytext=yytext.substr(1,yyleng-2); return 'CADENA';}




//espacios en blanco
[\ \r\t\f\t]        {};
[\ \n]              {};

<<EOF>>             return 'EOF';
.                   {ListaErrores.listaErrores.push(new errores.default("Lexico","El caracter "+ yytext+" no pertenece al lenguaje",yylloc.first_line,yylloc.first_column));}

%{

%}
/lex
//Precedencia
%right 'TERNARIO'
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'EQUALS' 'NOTEQUAL' 'MENOR' 'MENOREQ' 'MAYOR' 'MAYOREQ'
%left 'MAS' 'MENOS'
%left 'MULT' 'DIV' 'MOD'
%nonassoc 'POW'
%nonassoc 'INCRE' 'DECRE'
%right 'UMENOS'

//Simbolo Inicial
%start INICIO
%%

INICIO : INSTRUCCIONES EOF      {return $1;}
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION {$1.push($2);$$=$1;}
                | INSTRUCCION {$$=[$1];}
                | error PUNTOCOMA,EOF {ListaErrores.listaErrores.push(new errores.default("Sintactico",yytext,@1.first_line,@1.first_column));}
;

INSTRUCCION : DECLARACION                       {$$=$1;}
            | ASI                               {$$=$1;}
            | VEC                               {$$=$1;}
            | MVEC                              {$$=$1;}
            | INCREMENTO                        {$$=$1;}
            | DECREMENTO                        {$$=$1;}
            | SIF                               {$$=$1;}
            | SSWITCH                           {$$=$1;}
            | CWHILE                            {$$=$1;}
            | CFOR                              {$$=$1;}
            | CDOW                              {$$=$1;}
            | TBREAK                            {$$=$1;}
            | TCONTINUE                         {$$=$1;}
            | TRETURN                           {$$=$1;}
            | FUNCS                             {$$=$1;}
            | METODS                            {$$=$1;}
            | LLAMADAINS                        {$$=$1;}
            | PRINTT                            {$$=$1;}
            | PRINTLNN                          {$$=$1;}
            | RUNN                              {$$=$1;}
;

//Expresiones
EXP : EXP MAS EXP                           {$$=new Aritmeticas.default(Aritmeticas.Operadores.SUMA,@1.first_line,@1.first_column,$1,$3);}   
    | EXP MENOS EXP                         {$$=new Aritmeticas.default(Aritmeticas.Operadores.RESTA,@1.first_line,@1.first_column,$1,$3);}   
    | EXP MULT EXP                          {$$=new Aritmeticas.default(Aritmeticas.Operadores.MULT,@1.first_line,@1.first_column,$1,$3);}
    | EXP DIV EXP                           {$$=new Aritmeticas.default(Aritmeticas.Operadores.DIV,@1.first_line,@1.first_column,$1,$3);}
    | EXP POW EXP                           {$$=new Aritmeticas.default(Aritmeticas.Operadores.POW,@1.first_line,@1.first_column,$1,$3);}
    | EXP MOD EXP                           {$$=new Aritmeticas.default(Aritmeticas.Operadores.MOD,@1.first_line,@1.first_column,$1,$3);}
    | MENOS EXP %prec UMENOS                {$$=new Aritmeticas.default(Aritmeticas.Operadores.NEG,@1.first_line,@1.first_column,$2);}
    | TERNAR                                {$$=$1;}
    | EXP EQUALS EXP                        {$$=new Relacionales.default(Relacionales.Relacional.EQUALS,@1.first_line,@1.first_column,$1,$3);}
    | EXP NOTEQUAL EXP                      {$$=new Relacionales.default(Relacionales.Relacional.NOTEQUAL,@1.first_line,@1.first_column,$1,$3);}
    | EXP MENOR EXP                         {$$=new Relacionales.default(Relacionales.Relacional.MENOR,@1.first_line,@1.first_column,$1,$3);}
    | EXP MENOREQ EXP                       {$$=new Relacionales.default(Relacionales.Relacional.MENOREQ,@1.first_line,@1.first_column,$1,$3);}
    | EXP MAYOR EXP                         {$$=new Relacionales.default(Relacionales.Relacional.MAYOR,@1.first_line,@1.first_column,$1,$3);}
    | EXP MAYOREQ EXP                       {$$=new Relacionales.default(Relacionales.Relacional.MAYOREQ,@1.first_line,@1.first_column,$1,$3);}
    | EXP OR EXP                            {$$=new Logicas.default(Logicas.Logica.OR,@1.first_line,@1.first_column,$1,$3);}
    | EXP AND EXP                           {$$=new Logicas.default(Logicas.Logica.AND,@1.first_line,@1.first_column,$1,$3);}
    | EXP INCREMENT      %prec INCRE        {$$=new IncDec.default($1,1,@1.first_line,@1.first_column);}
    | EXP DECREMENT      %prec DECRE        {$$=new IncDec.default($1,0,@1.first_line,@1.first_column);}
    | NOT EXP                               {$$=new Logicas.default(Logicas.Logica.NOT,@1.first_line,@1.first_column,$2);}
    | PAR1 TIPOS PAR2 EXP                   {$$=new Casteo.default($4,$2,@1.first_line,@1.first_column);}
    | PAR1 EXP PAR2                         {$$=$2;}
    | ID COR1 EXP COR2 COR1 EXP COR2        {$$=new AccesoVec.default($1,2,$3,@1.first_line,@1.first_column,$6);}
    | ID COR1 EXP COR2                      {$$=new AccesoVec.default($1,1,$3,@1.first_line,@1.first_column);}
    | LLAMADA                               {$$=$1;}
    | TOLOW                                 {$$=$1;}
    | TOUP                                  {$$=$1;}
    | ROUNDD                                {$$=$1;}
    | LENGTHH                               {$$=$1;}
    | TYPEOFF                               {$$=$1;}
    | TOSTRINGG                             {$$=$1;}
    | ENTERO                                {$$=new Nativo.default(new Tipo.default(Tipo.tipoDato.ENTERO),$1,@1.first_line,@1.first_column);}
    | DECIMAL                               {$$=new Nativo.default(new Tipo.default(Tipo.tipoDato.DECIMAL),$1,@1.first_line,@1.first_column);}
    | TRUE                                  {$$=new Nativo.default(new Tipo.default(Tipo.tipoDato.BOOL),$1,@1.first_line,@1.first_column);}
    | FALSE                                 {$$=new Nativo.default(new Tipo.default(Tipo.tipoDato.BOOL),$1,@1.first_line,@1.first_column);}
    | CARACTER                              {$$=new Nativo.default(new Tipo.default(Tipo.tipoDato.CARACTER),$1,@1.first_line,@1.first_column);}
    | CADENA                                {$$=new Nativo.default(new Tipo.default(Tipo.tipoDato.CADENA),$1,@1.first_line,@1.first_column);}
    | ID                                    {$$=new AccesoVar.default($1,@1.first_line,@1.first_column);}
;

//tipos de datos
TIPOS: INT          {$$=new Tipo.default(Tipo.tipoDato.ENTERO);}
    | DOUBLE        {$$=new Tipo.default(Tipo.tipoDato.DECIMAL);}
    | BOOL          {$$=new Tipo.default(Tipo.tipoDato.BOOL);}
    | CHAR          {$$=new Tipo.default(Tipo.tipoDato.CARACTER);}
    | STRING        {$$=new Tipo.default(Tipo.tipoDato.CADENA);}
;

//declaracion de variables simples
DECLARACION : TIPOS LISTD DEC2      {$$=new DeclaracionVar.default($1,@1.first_line,@1.first_column,$2,$3);}
;

LISTD : LISTD COMA ID       {$1.push($3);$$=$1;}
    | ID                    {$$=[$1];}
;

DEC2 : PUNTOCOMA                {$$=null;}
    |   IGUAL EXP PUNTOCOMA     {$$=$2;}
;

//asignacion
ASI : ID IGUAL EXP PUNTOCOMA        {$$=new ModVar.default($1,$3,@1.first_line,@1.first_column);}
;
             
VEC : TIPOS COR1 COR2 COR1 COR2 ID IGUAL NEW TIPOS LLAVE1 EXP LLAVE2 LLAVE1 EXP LLAVE2 PUNTOCOMA        {$$=new DeclaracionArray1.default($1,$9,$6,$11,2,@1.first_line,@1.first_column,$14);}
    | TIPOS COR1 COR2 COR1 COR2 ID IGUAL LLAVE1 LISTVEC2 LLAVE2 PUNTOCOMA                           {$$=new DeclaracionArray2.default($1,$6,2,$9,@1.first_line,@1.first_column);}
    | TIPOS COR1 COR2 ID IGUAL NEW TIPOS LLAVE1 EXP LLAVE2 PUNTOCOMA                                {$$=new DeclaracionArray1.default($1,$7,$4,$9,1,@1.first_line,@1.first_column);}
    | TIPOS COR1 COR2 ID IGUAL LLAVE1 LISTVEC LLAVE2 PUNTOCOMA                                      {$$=new DeclaracionArray2.default($1,$4,1,$7,@1.first_line,@1.first_column);}
    | TIPOS COR1 COR2 ID IGUAL TOCHARARRAYY PUNTOCOMA                                           {$$=new DeclaracionArray2.default($1,$4,1,[],@1.first_line,@1.first_column,$6);}
;//char[] caracteres = tochararray(\"hola\");


LISTVEC : LISTVEC COMA EXP      {$1.push($3);$$=$1;}
        | EXP                   {$$=[$1];}
;

LISTVEC2 : LISTVEC2 COMA COR1 LISTVEC COR2      {$1.push($4); $$=$1;}
        | COR1 LISTVEC COR2                     {$$=[$2];}
;

//modifica vectores
MVEC : ID COR1 EXP COR2 COR1 EXP COR2 IGUAL EXP PUNTOCOMA           {$$=new ModVec.default($1,2,$9,@1.first_line,@1.first_column,$3,$6);}
    |  ID COR1 EXP COR2 IGUAL EXP PUNTOCOMA                         {$$=new ModVec.default($1,1,$6,@1.first_line,@1.first_column,$3);}
;


//Incremento y decremento
INCREMENTO: EXP INCREMENT PUNTOCOMA     {$$=new IncDec.default($1,1,@1.first_line,@1.first_column);}
;

DECREMENTO: EXP DECREMENT PUNTOCOMA           {$$=new IncDec.default($1,0,@1.first_line,@1.first_column);}
;

//ternario
TERNAR : EXP TERNARIO EXP DOSPUNTOS EXP         {$$=new Ternario.default($1,$3,$5,@1.first_line,@1.first_column);}
;

//if
SIF : IF PAR1 EXP PAR2 LLAVE1 INSTRUCCIONES LLAVE2 ELSE LLAVE1 INSTRUCCIONES LLAVE2         {$$=new If.default($3,$6,@1.first_line,@1.first_column,$10);}
    | IF PAR1 EXP PAR2 LLAVE1 INSTRUCCIONES LLAVE2 ELSE SIF                                 {$$=new If.default($3,$6,@1.first_line,@1.first_column,$9);}
    | IF PAR1 EXP PAR2 LLAVE1 INSTRUCCIONES LLAVE2                                          {$$=new If.default($3,$6,@1.first_line,@1.first_column);}
;

//switch
SSWITCH : SWITCH PAR1 EXP PAR2 LLAVE1 LISTCASE SDEF LLAVE2      {$$=new Switch.default($3,$6,@1.first_line,@1.first_column,$7);}
        | SWITCH PAR1 EXP PAR2 LLAVE1 LISTCASE LLAVE2           {$$=new Switch.default($3,$6,@1.first_line,@1.first_column);}
        | SWITCH PAR1 EXP PAR2 LLAVE1 SDEF LLAVE2               {$$=new Switch.default($3,undefined,@1.first_line,@1.first_column,$6);}
;

LISTCASE : LISTCASE SCASE       {$1.push($2);$$=$1;}
        | SCASE                 {$$=[$1];}
;

SCASE : CASE EXP DOSPUNTOS INSTRUCCIONES        {$$=new CaseDef.default(false,$4,@1.first_line,@1.first_column,$2);}
;

SDEF : DEFAULT DOSPUNTOS INSTRUCCIONES          {$$=new CaseDef.default(true,$3,@1.first_line,@1.first_column);}
;

//while
CWHILE : WHILE PAR1 EXP PAR2 LLAVE1 INSTRUCCIONES LLAVE2        {$$=new While.default($3,$6,@1.first_line,@1.first_column);}
;

//for
CFOR : FOR PAR1 S_DEC_ASI EXP PUNTOCOMA ACTUALIZACION PAR2 LLAVE1 INSTRUCCIONES LLAVE2       {$$=new For.default($3,$4,$6,$9,@1.first_line,@1.first_column);}
;

S_DEC_ASI : DECLARACION         {$$=$1;}
        | ASI                   {$$=$1;}
;

ACTUALIZACION : EXP INCREMENT       {$$=new IncDec.default($1,1,@1.first_line,@1.first_column);}
            | EXP DECREMENT         {$$=new IncDec.default($1,0,@1.first_line,@1.first_column);}
            | ID IGUAL EXP          {$$=new ModVar.default($1,$3,@1.first_line,@1.first_column);}
;

//do.while
CDOW : DO LLAVE1 INSTRUCCIONES LLAVE2 WHILE PAR1 EXP PAR2 PUNTOCOMA     {$$=new DoWhile.default($7,$3,@1.first_line,@1.first_column);}
; 

// break
TBREAK : BREAK PUNTOCOMA        {$$=new BreakContinue.default(BreakContinue.Opcion.BREAK,@1.first_line,@1.first_column)}
;

// continue
TCONTINUE : CONTINUE PUNTOCOMA  {$$=new BreakContinue.default(BreakContinue.Opcion.CONTINUE,@1.first_line,@1.first_column)}
;

// return
TRETURN : RETURN PUNTOCOMA              {$$=new Return.default(@1.first_line,@1.first_column);}
        | RETURN EXP PUNTOCOMA          {$$=new Return.default(@1.first_line,@1.first_column,$2);}
;

// Funciones
FUNCS : TIPOS ID PAR1 PARAMS PAR2 LLAVE1 INSTRUCCIONES LLAVE2         {$$=new Funcion.default($2,$1,$7,@1.first_line,@1.first_column,$4);}
    |   TIPOS ID PAR1 PAR2 LLAVE1 INSTRUCCIONES LLAVE2               {$$=new Funcion.default($2,$1,$6,@1.first_line,@1.first_column,[]);}
;

PARAMS : PARAMS COMA TIPOS ID               {$1.push({tipo:$3,id:$4});$$=$1;}
        | TIPOS ID                          {$$=[{tipo:$1,id:$2}];}
;

//Metodos                                                                           constructor(id: string, tipo: Tipo, expresiones: Instruccion[], linea: number, col: number, params: any[])
METODS : VOID ID PAR1 PARAMS PAR2 LLAVE1 INSTRUCCIONES LLAVE2             {$$=new Metodo.default($2,new Tipo.default(Tipo.tipoDato.VOID),$7,@1.first_line,@1.first_column,$4);}
    |   VOID ID PAR1 PAR2 LLAVE1 INSTRUCCIONES LLAVE2                     {$$=new Metodo.default($2,new Tipo.default(Tipo.tipoDato.VOID),$6,@1.first_line,@1.first_column,[]);}
;

// llamadas
LLAMADAINS : ID PAR1 PARAMSCALL PAR2 PUNTOCOMA       {$$=new Llamada.default($1,@1.first_line,@1.first_column,$3);} 
        | ID PAR1 PAR2 PUNTOCOMA                 {$$=new Llamada.default($1,@1.first_line,@1.first_column,[]);}
;

LLAMADA : ID PAR1 PARAMSCALL PAR2       {$$=new Llamada.default($1,@1.first_line,@1.first_column,$3);} 
        | ID PAR1 PAR2                  {$$=new Llamada.default($1,@1.first_line,@1.first_column,[]);}
;

PARAMSCALL : PARAMSCALL COMA EXP        {$1.push($3);$$=$1;}
            | EXP                       {$$=[$1];}
;

// print
PRINTT : PRINT PAR1 EXP PAR2 PUNTOCOMA {$$=new Print.default($3,@1.first_line,@1.first_column);}
;

// println
PRINTLNN : PRINTLN PAR1 EXP PAR2 PUNTOCOMA {$$=new PrintLn.default($3,@1.first_line,@1.first_column);}
;

// tolower
TOLOW : TOLOWER PAR1 EXP PAR2                   {$$=new FuncNativas.default($3,FuncNativas.Funciones.TOLOWER,@1.first_line,@1.first_column);}
;

// toupper
TOUP : TOUPPER PAR1 EXP PAR2                    {$$=new FuncNativas.default($3,FuncNativas.Funciones.TOUPPER,@1.first_line,@1.first_column);}
;

 // round
ROUNDD : ROUND PAR1 EXP PAR2                    {$$=new FuncNativas.default($3,FuncNativas.Funciones.ROUND,@1.first_line,@1.first_column);}
;

// length
LENGTHH : LENGTH PAR1 EXP PAR2                  {$$=new FuncNativas.default($3,FuncNativas.Funciones.LENGTH,@1.first_line,@1.first_column);}
;

//typeof
TYPEOFF : TYPEOF PAR1 EXP PAR2                  {$$=new FuncNativas.default($3,FuncNativas.Funciones.TYPEOF,@1.first_line,@1.first_column);} 
;

// tostring
TOSTRINGG : TOSTRING PAR1 EXP PAR2              {$$=new FuncNativas.default($3,FuncNativas.Funciones.TOSTRING,@1.first_line,@1.first_column);} 
;

// to char array
TOCHARARRAYY : TOCHARARRAY PAR1 EXP PAR2        {$$=new FuncNativas.default($3,FuncNativas.Funciones.TOCHARARRAY,@1.first_line,@1.first_column);}
;

// RUN
RUNN : RUN ID PAR1 PAR2 PUNTOCOMA               {$$=new Run.default($2,@1.first_line,@1.first_column,[]);}
    | RUN ID PAR1 LISTRUN PAR2 PUNTOCOMA        {$$=new Run.default($2,@1.first_line,@1.first_column,$4);}
;

LISTRUN : LISTRUN COMA EXP      {$1.push($3);$$=$1;}
        | EXP                   {$$=[$1];}
;