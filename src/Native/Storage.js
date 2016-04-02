function storageAvailable(type) {
  try {
    var storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch(e) {
    return false;
  }
}

if (!storageAvailable('localStorage')) {
  console.error("This browser does not support localStorage.");
}

var storage = localStorage;

Elm.Native = Elm.Native || {};
Elm.Native.Storage = {};
Elm.Native.Storage.make = function(localRuntime) {

  localRuntime.Native = localRuntime.Native || {};
  localRuntime.Native.Storage = localRuntime.Native.Storage || {};

  if (localRuntime.Native.Storage.values) {
    return localRuntime.Native.Storage.values;
  }

  var Task = Elm.Native.Task.make(localRuntime);
  var Utils = Elm.Native.Utils.make(localRuntime);
  var List = Elm.Native.List.make(localRuntime);

  // getItemAsJson : String -> Task error Value
  var getItemAsJson = function(key) {
    return Task.asyncFunction(function(callback) {
      try {
        var item = storage.getItem(key);
        if (item == null) {
          throw "Error";
        }

        callback(Task.succeed(item));

      } catch (e) {
        callback(Task.fail("Storage Call: getItemAsJson has failed with key: " + key));
      }
    });
  };

  // setItem : String -> Value -> Task error ()
  var setItem = function(key, value) {
    return Task.asyncFunction(function(callback) {
      try {
        storage.setItem(key, value);
        callback(Task.succeed(Utils.Tuple0));
      } catch (e) {
        callback(Task.fail("Storage Call: setItem has failed with key: " + key + " and value: " + value));
      }
    });
  };

  // removeItem : String -> Task error ()
  var removeItem = function(key) {
    return Task.asyncFunction(function(callback) {
      try {
        storage.removeItem(key, value);
        callback(Task.succeed(Utils.Tuple0));
      } catch (e) {
        callback(Task.fail("Storage Call: removeItem has failed with key: " + key));
      }
    });
  };

  // clear : Task error ()
  var clear = Task.asyncFunction(function(callback) {
    try {
      storage.clear();
      callback(Task.succeed(Utils.Tuple0));
    } catch (e) {
      callback(Task.fail("Storage Call: clear has failed"));
    }
  });

  return {
    getItemAsJson : getItemAsJson,
    setItem       : F2(setItem),
    removeItem    : removeItem,
    clear         : clear
  };

};
