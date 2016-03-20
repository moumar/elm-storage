module Storage (..) where

{-| This library provides access to the HTML LocalStorage API
through Tasks.

# Documentation
@docs getItemAsJson
@docs getItem
@docs setItem
@docs removeItem
@docs clear
@docs keys
@docs length
-}

import Json.Encode exposing (Value)
import Json.Decode exposing (Decoder, decodeValue)
import Task exposing (Task, succeed, fail, andThen)
import List
import Native.Storage


{-| Get the value of a key from local storage, assuming it is JSON
-}
getItemAsJson : String -> Task String Value
getItemAsJson =
  Native.Storage.getItemAsJson


{-| Get the value of a key from local storage
-}
getItem : String -> Decoder value -> Task String value
getItem key decoder =
  let
    decode value =
      case decodeValue decoder value of
        Ok v ->
          succeed v

        Err err ->
          fail "Failed"
  in
    getItemAsJson key `andThen` decode


{-| Set the value of a key in local storage
-}
setItem : String -> Value -> Task String ()
setItem =
  Native.Storage.setItem


{-| Remove a key from local storage
-}
removeItem : String -> Task String ()
removeItem =
  Native.Storage.removeItem


{-| Clear all local storage
-}
clear : Task String ()
clear =
  Native.Storage.clear


{-| Get a list of all keys in local storage
-}
keys : Task String (List String)
keys =
  Native.Storage.keys


{-| Get the number of keys in local storage
-}
length : Task String Int
length =
  Native.Storage.length
