module = angular.module("appProva", []);

module.controller("DisciplinaController", ["$scope","$http", DisciplinaController]);

function DisciplinaController($scope,$http) {
    
    $scope.iniciar = funcaoIniciar;
    $scope.salvar = funcaoSalvar;
    $scope.excluir = funcaoExcluir;
    $scope.editar = funcaoEditar;
    
    $scope.disciplinas = [];
    $scope.disciplina = {};
    $scope.isNovo = true;
    
    function funcaoEditar(disci) {
        $scope.disciplina = angular.copy(disci);
        $scope.isNovo = false;
    }

    function funcaoExcluir(disci) {
        $http.delete("/disciplinas/" + disci.id).success(soSucesso).error(aiCaramba);
        function soSucesso(data, status){
            $scope.isNovo = true;
            funcaoCarregar();
        }
        function aiCaramba(data, status){
            alert("Verifica isso aí colega!");
            console.log(data);
            console.log(status);
        }
    }
    
    function funcaoSalvar() {
        if($scope.isNovo){
            $http.post("/disciplinas", $scope.disciplina).success(soSucesso).error(aiCaramba);
        }
        else{
            $http.put("/disciplinas", $scope.disciplina).success(soSucesso).error(aiCaramba);
        }
        function soSucesso(data, status){
            $scope.disciplina = {};
            funcaoCarregar();
            $scope.isNovo = true;
        }
        function aiCaramba(data, status){
            alert("Verifica isso aí colega!");
            console.log(data);
            console.log(status);
        }
    }
    
    function funcaoCarregar() {
        $http.get("/disciplinas").success(onSuccess).error(onError);
       
        function onSuccess(data, status) {
            $scope.disciplinas = data;       
            console.log(data);
        }
        function onError(data, status) {
            alert("Deu erro: " + data);
        }
    }
    
    function funcaoIniciar() {
        funcaoCarregar();
        console.log(">>> disciplinas carregados....");
    }
        
}


