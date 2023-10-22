import ktrain
import pathlib

def LoadModels():
    path = str(pathlib.Path(__file__).parent.resolve()) + "/models/model"
    print(path)
    models = []
    predictor = ktrain.load_predictor(path)
    model = ktrain.get_predictor(predictor.model, predictor.preproc)

    models.append(model)

    return models

def InitModels():
    base_version = "1."
    models_with_version = []

    # Load models
    models = LoadModels()
    
    # Give them a version
    for i in range(len(models)):
        version = base_version + str(i)
        models_with_version.append([version, models[i]])
    return models_with_version

def getPredictionText(title, description):
    s = "Classify the seniority/experienced required for the software engineer job provided below into one of the following categories: " + str(["entry-level", "entry-mid-level", "mid-level", "senior-level", "unknown"])
    s += "\n\ndescription_text:\n"+ description
    s += "\n\ntitle:\n" + title
    return s

def predictOne(models, title, text):
    results = []

    for version, model in models:
        result = {}
        result["version"] = version
        predict_text = getPredictionText(title=title, description=text)
        result["rating"] = model.predict(predict_text)
        results.append(result)

    return {"result": results}

def mergeJobMachineRating(machineRatings, existingRatings):
    if(existingRatings == None):
        return machineRatings

    for rating in machineRatings:
        version = rating["version"]
        versionExists = version in [r['version'] for r in existingRatings]
        
        if(not versionExists):
            existingRatings.append(rating)

    return existingRatings